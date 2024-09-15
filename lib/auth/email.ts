import { alphabet, generateRandomString } from "oslo/crypto";
import client from "../mongodb";

export async function generateEmailVerificationCode(userId: string, email: string): Promise<string> {
	await client.connect();

	// Remove all existing codes
	const existing_codes = client.db().collection("verification_codes").find({ user_id: userId });

	for await (const code of existing_codes) {
		await client.db().collection("verification_codes").deleteOne({ _id: code._id });
	}

	// Generate a new code
	const code = generateRandomString(8, alphabet("0-9"));

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