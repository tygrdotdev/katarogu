import { validateRequest } from "@/auth";
import client from "@/lib/mongodb";

export default async function DELETE() {
	const { user } = await validateRequest();

	if (!user) {
		return new Response(JSON.stringify({
			error: true,
			message: "Unauthorized"
		}));
	}

	await client.connect();

	// @ts-expect-error _id refers to userId, which is a string, but the type expects an ObjectId. It works regardless.
	client.db().collection("users").updateOne({ _id: user.id }, { $set: { banner: `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=25` } });

	return new Response(JSON.stringify({
		error: false,
		message: "Successfully removed banner"
	}));
}
