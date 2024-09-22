import { validateRequest } from "@/auth";
import client from "@/lib/mongodb";

export async function DELETE() {
	const { user } = await validateRequest();

	if (!user) {
		return new Response(JSON.stringify({
			error: true,
			message: "Unauthorized"
		}));
	}

	await client.connect();

	// @ts-expect-error _id refers to userId, which is a string, but the type expects an ObjectId. It works regardless.
	client.db().collection("users").updateOne({ _id: user.id }, { $set: { avatar: `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${user.username}&radius=50` } });

	return new Response(JSON.stringify({
		error: false,
		message: "Successfully removed avatar"
	}));
}
