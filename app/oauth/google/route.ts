import { generateState, generateCodeVerifier } from "arctic";
import { google } from "@/auth/oauth/providers";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response> {
	const flow = request.nextUrl.searchParams.get("flow") ?? "auth";
	console.log(flow)
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = google.createAuthorizationURL(state, codeVerifier, ["openid", "profile", "email"]);
	url.searchParams.set("flow", flow);

	cookies().set("google_oauth_state", state, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax"
	});

	cookies().set("google_code_verifier", codeVerifier, {
		path: "/",
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		maxAge: 60 * 10, // 10 minutes
		sameSite: "lax"
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: url.toString()
		}
	});
}