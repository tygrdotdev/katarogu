import { getCurrentSession, UsersCollection } from "@/auth/sessions";
import minio from "@/lib/minio";
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

	if (process.env.USE_S3 === "true") {
		await minio.removeObject("public", `banners/${user.id}`);
	} else {
		await client.connect();

		client.db().collection<{ _id: string }>("banners").deleteOne({
			_id: user.id
		});
	}

	await client.db().collection<UsersCollection>("users").updateOne({ _id: user.id }, { $set: { banner: `https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=25` } });

	return NextResponse.json(null, {
		status: 200
	});
}