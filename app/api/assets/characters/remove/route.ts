import { getCurrentSession } from "@/auth/sessions";
import minio from "@/lib/minio";
import client from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
	const { user } = await getCurrentSession();

	if (!user) {
		return NextResponse.json({
			error: true,
			message: "Unauthorized"
		}, {
			status: 401
		});
	}

	const data = await req.formData();
	const id = data.get("id") as string;

	if (process.env.USE_S3 === "true") {
		await minio.removeObject("public", `character_covers/${id}`);
	} else {
		await client.connect();

		client.db().collection<{ _id: string }>("character_covers").deleteOne({
			_id: id
		});
	}

	return NextResponse.json({
		error: false,
		message: "Cover removed successfully"
	}, {
		status: 200
	});
}