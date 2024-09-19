"use server";

import { ActionResult } from "@/components/form";
import { lucia, validateRequest } from "..";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: true,
			message: "Unauthorized"
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}