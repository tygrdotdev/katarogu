import { generateSessionToken, createSession, UsersCollection, getCurrentSession } from "@/auth/sessions";
import { google } from "@/auth/oauth/providers";
import { cookies } from "next/headers";

import { decodeIdToken, type OAuth2Tokens } from "arctic";
import client from "@/lib/mongodb";
import { setSessionTokenCookie } from "@/auth/cookies";
import { generateIdFromEntropySize } from "@/auth/crypto";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;

	if (code === null || state === null || storedState === null || codeVerifier === null) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/oauth/error?error_code=invalid_request",
			}
		})
	}

	if (state !== storedState) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/oauth/error?error_code=invalid_request",
			}
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await google.validateAuthorizationCode(code, codeVerifier);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/oauth/error?error_code=invalid_request",
			}
		});
	}

	const claims = decodeIdToken(tokens.idToken()) as { sub: string; name: string; picture: string; email: string };
	const id = claims.sub;
	const name = claims.name;
	const avatar = claims.picture;
	const email = claims.email;

	/// ---
	/// If a session already exists, link the Google account to the user.
	/// ---

	// First, check if a user is already logged in, if so, link the Google account to the user.
	const { session: currentSession, user } = await getCurrentSession();
	console.log(currentSession, user);

	if (currentSession !== null) {
		// If the user is logged in, link the Google account to the user.
		client.db().collection<UsersCollection>("users").updateOne({ _id: user.id }, {
			$set: {
				google_id: id
			}
		});

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/oauth/success"
			}
		});
	}

	/// ---
	/// If user that already exists with the Google ID, log them in.
	/// ---

	await client.connect();

	// Check if the user already exist with the Google ID.
	const existingUser = await client.db().collection<UsersCollection>("users").findOne({ google_id: id });

	// If the user exists, log them in
	if (existingUser !== null) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser._id);
		setSessionTokenCookie(sessionToken, session.expires_at);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/oauth/success"
			}
		});
	}

	/// ---
	/// If an account with a matching email exists which is verified, link the Google account to the user.
	/// ---

	// If a linked user cannot be found, either update the existing user or create a new user.
	const row = await client.db().collection<UsersCollection>("users").findOne({ email });

	// If a user exists, link the Google account to the existing user, or create a new user.
	if (row !== null && email === row.email) {
		if (row.email_verified === false) {
			// If the user's email is not verified, return an error.
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/oauth/error?error_code=email_not_verified"
				}
			});
		}

		if (row.oauth_auto_link === false) {
			// If the matching account doesn't have auto-linking enabled, return an error.
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/oauth/error?error_code=auto_link_disabled"
				}
			});
		}

		// If the user's email is verified, and matches the Google email, or create a new user.
		client.db().collection<UsersCollection>("users").updateOne({ _id: row._id }, {
			$set: {
				google_id: id
			}
		});

		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, row._id);
		setSessionTokenCookie(sessionToken, session.expires_at);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/oauth/success"
			}
		});
	}

	/// ---
	/// If not user exists, create a new user.
	/// --- 

	const userId = generateIdFromEntropySize(10);

	client.db().collection<UsersCollection>("users").insertOne({
		_id: userId,
		name,
		username: name.replace(" ", "_").toLowerCase() + "_" + "google",
		email,
		email_verified: true,
		avatar,
		banner: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=25",
		password_hash: null,
		visibility: "public",
		oauth_auto_link: false,
		github_id: null,
		google_id: id
	});

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, userId);
	setSessionTokenCookie(sessionToken, session.expires_at);

	return new Response(null, {
		status: 302,
		headers: {
			Location: "/"
		}
	});
}