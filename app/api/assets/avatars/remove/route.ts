import { validateRequest } from "@/auth";
import minio from "@/lib/minio";
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

	if (process.env.USE_S3 === "true") {
		await minio.removeObject("public", `avatars/${user.id}.png`);
	} else {
		await client.connect();

		client.db().collection("avatars").deleteOne({
			user_id: user.id
		});
	}

	return NextResponse.json({
		error: false,
		message: "Avatar removed successfully"
	}, {
		status: 200
	});
}
