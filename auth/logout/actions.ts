"use server";

import { ActionResult } from "@/components/form";
import { redirect } from "next/navigation";
import { getCurrentSession, invalidateSession } from "@/auth/sessions";
import { deleteSessionTokenCookie } from "@/auth/cookies";

export async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await getCurrentSession();
	if (!session) {
		return {
			error: true,
			message: "Unauthorized"
		};
	}

	await invalidateSession(session.id);

	deleteSessionTokenCookie();
	return redirect("/");
}