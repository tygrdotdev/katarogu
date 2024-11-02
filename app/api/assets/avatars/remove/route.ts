import { getCurrentSession } from "@/auth/sessions";
import minio from "@/lib/minio";
import client from "@/lib/mongodb";
import { UsersCollection } from "@/types/database/user";
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
		await minio.removeObject("public", `avatars/${user.id}.png`);
	} else {
		await client.connect();

		client.db().collection<{ _id: string }>("avatars").deleteOne({
			_id: user.id
		});
	}

	await client.db().collection<UsersCollection>("users").updateOne({
		_id: user.id
	}, {
		$set: {
			avatar: `https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${user.username}`
		}
	});

	return NextResponse.json({
		error: false,
		message: "Avatar removed successfully"
	}, {
		status: 200
	});
}