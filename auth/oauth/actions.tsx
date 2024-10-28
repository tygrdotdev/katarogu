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

	const full_data = await client.db().collection<UsersCollection>("users").findOne({ _id: user?.id });

	if (!full_data) {
		return {
			error: true,
			message: "Unauthorized"
		}
	}

	if (!full_data.github_id) {
		return {
			error: true,
			message: "GitHub account not linked"
		}
	}

	if (!full_data.password_hash && !full_data.google_id && !full_data.discord_id) {
		return {
			error: true,
			message: "Please create a password or link another provider before unlinking GitHub."
		}
	}

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

	const full_data = await client.db().collection<UsersCollection>("users").findOne({ _id: user?.id });

	if (!full_data) {
		return {
			error: true,
			message: "Unauthorized"
		}
	}

	if (!full_data.google_id) {
		return {
			error: true,
			message: "Google account not linked"
		}
	}

	if (!full_data.password_hash && !full_data.github_id && !full_data.discord_id) {
		return {
			error: true,
			message: "Please create a password or link another provider before unlinking Google."
		}
	}

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

export async function unlinkOAuthDiscord() {
	"use server";
	const { user } = await getCurrentSession();

	if (!user) {
		return {
			error: true,
			message: "Unauthorized"
		}
	}

	await client.connect();

	const full_data = await client.db().collection<UsersCollection>("users").findOne({ _id: user?.id });

	if (!full_data) {
		return {
			error: true,
			message: "Unauthorized"
		}
	}

	if (!full_data.discord_id) {
		return {
			error: true,
			message: "Discord account not linked"
		}
	}

	if (!full_data.password_hash && !full_data.google_id && !full_data.github_id) {
		return {
			error: true,
			message: "Please create a password or link another provider before unlinking Discord."
		}
	}

	await client.db().collection<UsersCollection>("users").updateOne({ _id: user?.id }, {
		$unset: {
			discord_id: ""
		}
	});

	return {
		error: false,
		message: "Discord account unlinked"
	}
}
