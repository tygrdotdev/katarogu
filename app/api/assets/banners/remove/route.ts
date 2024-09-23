import { validateRequest } from "@/auth";
import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE() {
	const { user } = await validateRequest();

	if (!user) {
		return NextResponse.json({
			error: true,
			message: "Unauthorized"
		}, {
			status: 401
		});
	}

	await client.connect();

	// @ts-expect-error _id refers to userId, which is a string, but the type expects an ObjectId. It works regardless.
	await client.db().collection("users").updateOne({ _id: user.id }, { $set: { banner: `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=25` } });

	return NextResponse.json(null, {
		status: 200
	});
}
