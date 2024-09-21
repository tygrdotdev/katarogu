"use server";

import { ActionResult } from "@/components/form";
import client from "@/lib/mongodb";
import { isValidEmail } from "@/lib/utils";
import { verify } from "@node-rs/argon2";
import { lucia } from "../..";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: ActionResult, formData: FormData) {
	"use server";
	const email = formData.get("email");

	if (!email || !isValidEmail(email.toString())) {
		return {
			error: true,
			message: "Invalid email"
		};
	}

	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: true,
			message: "Invalid password"
		};
	}

	await client.connect();

	const existing = await client.db().collection("users").findOne({ email: email });

	if (!existing) {
		return {
			error: true,
			message: "Incorrect email or password"
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
			error: true,
			message: "Incorrect email or password"
		};
	}

	const session = await lucia.createSession(existing._id.toString(), {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}