"use server";

import { ActionResult } from "@/components/form";
import client from "@/lib/mongodb";
import { isValidEmail } from "@/lib/utils";
import { render } from "jsx-email";
import { createDate, TimeSpan } from "oslo";
import { alphabet, generateRandomString, sha256 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";
import ResetPasswordEmail from "./email";
import { hash } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import Plunk from "@plunk/node";

// Email functions
export async function generateResetPasswordToken(userId: string, email: string): Promise<string> {
	await client.connect();

	const existing_token = client.db().collection("password_reset_tokens").find({ user_id: userId });

	for await (const token of existing_token) {
		await client.db().collection("password_reset_tokens").deleteOne({ _id: token._id });
	}

	const token = generateRandomString(64, alphabet("0-9", "A-Z", "a-z"));
	const sha = encodeHex(await sha256(new TextEncoder().encode(token)));

	await client.db().collection("password_reset_tokens").insertOne({
		user_id: userId,
		token: sha,
		// Token expires in 1 hour
		expires_at: createDate(new TimeSpan(1, "h"))
	});

	await client.close();

	return token;
}

export async function sendResetPasswordEmail(email: string, token: string) {
	client.connect();

	const user = await client.db().collection("users").findOne({ email });

	if (!user) {
		// We do not tell the user if the email is invalid to prevent email enumeration
		return;
	}

	const plunk = new Plunk(process.env.PLUNK_API_KEY!);

	const body = await render(<ResetPasswordEmail resetToken={token} />);

	await plunk.emails.send({
		to: user.email,
		subject: "Password reset request",
		body,
		type: "html"
	}).then((res) => {
		return res.success;
	}).catch((err) => {
		console.error(err);
		return false;
	});
}

// Server functions
export async function requestPasswordReset(_: unknown, formData: FormData): Promise<ActionResult> {
	"use server";

	const email = formData.get("email");
	if (!email || !isValidEmail(email.toString())) {
		return {
			error: true,
			message: "Invalid email"
		};
	}

	await client.connect();

	const user = await client.db().collection("users").findOne({
		email
	});

	if (!user) {
		return {
			error: true,
			message: "Invalid email"
		};
	}

	const token = await generateResetPasswordToken(user._id.toString(), user.email);
	await sendResetPasswordEmail(user.email, token);

	return {
		error: false,
		message: "Please check your email for a password reset link",
	}
}

export async function resetPassword(_: unknown, formData: FormData): Promise<ActionResult> {
	"use server";
	const token = formData.get("token");
	if (typeof token !== "string") {
		return {
			error: true,
			message: "Invalid token"
		};
	}

	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 8 || password.length > 255) {
		return {
			error: true,
			message: "Invalid password"
		};
	}

	const passwordConfirm = formData.get("passwordConfirm");
	if (password !== passwordConfirm) {
		return {
			error: true,
			message: "Passwords do not match"
		};
	}

	await client.connect();

	// Plain token from URL converted to sha256
	const sha = encodeHex(await sha256(new TextEncoder().encode(token)));

	const data = await client.db().collection("password_reset_tokens").findOne({ token: sha });

	// If the token doesn't exist, return an message
	if (!data) {
		return {
			error: true,
			message: "Invalid token. Please request a new password reset link."
		};
	}

	if (data.expires_at < new Date()) {
		return {
			error: true,
			message: "Token has expired. Invalid token. Please request a new password reset link."
		};
	}

	// Compare hash
	if (sha !== data.token) {
		return {
			error: true,
			message: "Invalid token. Please request a new password reset link."
		};
	}

	await lucia.invalidateUserSessions(data.user_id);

	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	await client.db().collection("users").updateOne({
		_id: data.user_id
	}, {
		$set: {
			password_hash: passwordHash
		}
	});

	await client.db().collection("reset_password_tokens").deleteOne({
		token
	});

	const session = await lucia.createSession(data.user_id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return redirect("/");
}