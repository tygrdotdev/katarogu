"use server";

import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResult } from "@/components/form";
import { isValidEmail } from "@/lib/utils";
import client from "@/lib/mongodb";
import { lucia } from "@/auth";
import { generateEmailVerificationCode, sendVerificationEmail } from "../verify";

export async function register(prevState: ActionResult, formData: FormData) {
	"use server";
	const name = formData.get("name");
	if (typeof name !== "string" || name.length < 2 || name.length > 32) {
		return {
			error: true,
			message: "Please enter a valid name between 2 and 32."
		};
	}

	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 24 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: true,
			message: "Please enter a valid username between 3 and 24 characters."
		};
	}

	const email = formData.get("email");
	if (typeof email !== "string" || !isValidEmail(email.toString())) {
		return {
			error: true,
			message: "Please enter a valid email."
		};
	}

	await client.connect();

	const existing = await client.db().collection("users").findOne({ $or: [{ username }, { email }] });

	if (existing) {
		if (existing.username === username) {
			return {
				error: true,
				message: "Username already in use."
			};
		}
		if (existing.email === email) {
			return {
				error: true,
				message: "Email already in use."
			};
		}
	}

	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 8 || password.length > 255) {
		return {
			error: true,
			message: "Please enter a valid password between 8 and 255 characters long."
		};
	}

	const passwordConfirm = formData.get("passwordConfirm");
	if (password !== passwordConfirm) {
		return {
			error: true,
			message: "Passwords do not match."
		};
	}

	const passwordHash = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	const userId = generateIdFromEntropySize(10);

	client.db().collection("users").insertOne({
		// @ts-expect-error _id refers to userId, which is a string, but the type expects an ObjectId. It works regardless.
		_id: userId,
		name,
		username,
		email,
		email_verified: false,
		avatar: `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${username}`,
		banner: "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=20",
		password_hash: passwordHash,
		two_factor_secret: null
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	const code = await generateEmailVerificationCode(userId, email);

	await sendVerificationEmail(email, code);

	return redirect("/auth/verify");
}