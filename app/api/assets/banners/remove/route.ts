import { getCurrentSession, UsersCollection } from "@/auth/sessions";
import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE() {
	const { user } = await getCurrentSession();

	if (!user) {
		return NextResponse.json({
			error: true,
			message: "Unauthorized"
		}, {
			status: 401
		});
	}

	await client.connect();

	await client.db().collection<UsersCollection>("users").updateOne({ _id: user.id }, { $set: { banner: `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=25` } });

	return NextResponse.json(null, {
		status: 200
	});
}