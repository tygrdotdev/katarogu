"use server";

import client from "@/lib/mongodb";
import { getCurrentSession, UsersCollection } from "../sessions";

export async function updateUser(formData: FormData) {
	"use server";
	const { user } = await getCurrentSession();

	if (!user) {
		return {
			error: true,
			message: "Unauthorized"
		}
	}

	let changes = {};

	if (formData.has("username")) {
		changes = {
			...changes,
			username: formData.get("username")
		}
	}

	if (formData.has("name")) {
		changes = {
			...changes,
			name: formData.get("name")
		}
	}

	if (Object.keys(changes).length === 0) {
		return {
			error: false,
			message: "No changes"
		}
	}

	for (const [key, value] of formData.entries()) {
		switch (key) {
			case "username": {
				const val = value.toString();
				if (val.length < 3 || val.length > 32) {
					return {
						error: true,
						message: "Your username must be between 3 and 32 characters"
					}
				}

				if (val === user.username) {
					return {
						error: true,
						message: "Please make some changes before saving"
					}
				}
				break;
			}

			case "name": {
				const val = value.toString();

				if (val === user.name) {
					return {
						error: true,
						message: "Please make some changes before saving"
					}
				}
				break;
			}
		}
	}

	await client.connect();

	await client.db().collection<UsersCollection>("users").updateOne({ _id: user.id }, {
		$set: changes
	});

	return {
		error: false,
		message: "Your changes have been saved"
	}
}