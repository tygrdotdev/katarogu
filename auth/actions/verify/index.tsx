"use server";

import { ActionResult } from "@/components/form";
import { lucia, validateRequest } from "../..";
import client from "@/lib/mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { render } from "jsx-email";
import { alphabet, generateRandomString } from "oslo/crypto";
import VerifyAccountEmail from "./email";
import Plunk from "@plunk/node";

// Email actions
export async function generateEmailVerificationCode(userId: string, email: string): Promise<string> {
	await client.connect();

	// Remove all existing codes for this email
	const existing_codes = client.db().collection("verification_codes").find({ $or: [{ email: email }, { user_id: userId }] });

	for await (const code of existing_codes) {
		await client.db().collection("verification_codes").deleteOne({ _id: code._id });
	}

	// Generate a new code
	const code = generateRandomString(6, alphabet("0-9"));

	// Insert the new code
	await client.db().collection("verification_codes").insertOne({
		user_id: userId,
		email,
		code,
		expires_at: new Date(Date.now() + 1000 * 60 * 15) // 15 minutes
	});

	await client.close();

	return code;
}

export async function sendVerificationEmail(email: string, code: string) {
	const plunk = new Plunk(process.env.PLUNK_API_KEY!);

	const body = await render(<VerifyAccountEmail verificationCode={code} />);

	await plunk.emails.send({
		to: email,
		subject: "Verify your account",
		body,
		type: "html"
	}).then((res) => {
		return res.success;
	}).catch((err) => {
		console.error(err);
		return false;
	});
}

// Server actions
export async function verifyAccount(_: unknown, formData: FormData): Promise<ActionResult> {
	"use server";
	const { user } = await validateRequest();

	if (!user) {
		return {
			error: true,
			message: "Unauthorized"
		};
	}

	const code = formData.get("code");
	console.log(code)
	if (typeof code !== "string" || code.length !== 6) {
		return {
			error: true,
			message: "Invalid code"
		};
	}

	// Find a code that matches the user's email or the user's ID
	const validCode = await client.db().collection("verification_codes").findOne({ $or: [{ email: user.email }, { user_id: user.id }] });
	console.log(validCode)

	if (!validCode) {
		return {
			error: true,
			message: "Invalid code"
		};
	}

	// check if the validCode hasn't expired
	if (validCode.expires_at < new Date()) {
		return {
			error: true,
			message: "Code has expired. Please request a new one."
		};
	}

	if (validCode.code !== code) {
		return {
			error: true,
			message: "Invalid code"
		};
	}

	await lucia.invalidateUserSessions(user.id);
	// @ts-expect-error _id refers to userId, which is a string, but the type expects an ObjectId. It works regardless.
	await client.db().collection("users").updateOne({ _id: user.id }, { $set: { email_verified: true } });

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/auth/verify/success");
}

export async function resendVerificationEmail() {
	"use server";
	const { user } = await validateRequest();

	if (!user) {
		return {
			message: "Unauthorized"
		}
	};

	if (user.email_verified) {
		return {
			message: "Your account is already verified"
		}
	}

	const code = await generateEmailVerificationCode(user.id, user.email);

	await sendVerificationEmail(user.email, code);
}

