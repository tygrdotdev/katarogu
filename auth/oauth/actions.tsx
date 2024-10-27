"use server";

import client from "@/lib/mongodb";
import { getCurrentSession, UsersCollection } from "../sessions";

export async function unlinkOAuthGithub() {
	"use server";
	const { user } = await getCurrentSession();

	if (!user) {
		return {
			error: true,
			message: "Unauthorized"
		}
	}

	await client.connect();

	await client.db().collection<UsersCollection>("users").updateOne({ _id: user?.id }, {
		$unset: {
			github_id: ""
		}
	});

	return {
		error: false,
		message: "GitHub account unlinked"
	}
}

export async function unlinkOAuthGoogle() {
	"use server";
	const { user } = await getCurrentSession();

	if (!user) {
		return {
			error: true,
			message: "Unauthorized"
		}
	}

	await client.connect();

	await client.db().collection<UsersCollection>("users").updateOne({ _id: user?.id }, {
		$unset: {
			google_id: ""
		}
	});

	return {
		error: false,
		message: "Google account unlinked"
	}
}