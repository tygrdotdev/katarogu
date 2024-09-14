"use server"

import { ActionResult } from "@/components/form";
import client from "@/lib/mongodb";
import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidEmail } from "@/lib/utils";
import { lucia, validateRequest } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function register(_: any, formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("username");
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}

	const email = formData.get("email");
	if (!email || !isValidEmail(email.toString())) {
		return {
			error: "Invalid email"
		};
	}

	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
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

	await client.connect().catch(err => {
		console.error(err);
		return {
			error: "Failed to connect to database"
		};
	})

	client.db().collection("users").insertOne({
		_id: new ObjectId(userId),
		email: email,
		email_verified: false,
		username: username,
		password_hash: passwordHash
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return redirect("/");
}

export async function login(_: any, formData: FormData): Promise<ActionResult> {
	"use server";
	const email = formData.get("email");

	if (!email || !isValidEmail(email.toString())) {
		return {
			error: "Invalid email"
		};
	}

	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}

	await client.connect();

	const existing = await client.db().collection("users").findOne({ email: email });

	if (!existing) {
		return {
			error: "Incorrect email or password"
		};
	}

	const validPassword = await verify(existing.password_hash, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});

	if (!validPassword) {
		return {
			error: "Incorrect email or password"
		};
	}

	const session = await lucia.createSession(existing._id.toString(), {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

export async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}