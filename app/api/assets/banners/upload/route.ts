import { validateRequest } from "@/auth";
import minio from "@/lib/minio";
import client from "@/lib/mongodb";
import { MAX_FILE_SIZE } from "@/lib/utils";

export async function POST(request: Request) {
	const { user } = await validateRequest();

	if (!user) {
		return new Response(JSON.stringify({
			error: true,
			message: "Unauthorized"
		}), {
			status: 401
		});
	}

	const form = await request.formData();
	const file = form.get("file") as File;

	if (!file) {
		return new Response(JSON.stringify({
			error: true,
			message: "No file was selected"
		}), {
			status: 400
		});
	}

	if (file.size > MAX_FILE_SIZE) {
		return new Response(JSON.stringify({
			error: true,
			message: "Please upload a file smaller than 12MB"
		}), {
			status: 400
		});
	}

	const bucket = "public";
	const extension = file.type.split("/").pop();
	const path = `banners/${user.id}.${extension}`;

	const exists = await minio.bucketExists(bucket);

	if (!exists) {
		await minio.makeBucket(bucket);
	}

	await minio.putObject(bucket, path, Buffer.from(await file.arrayBuffer()), file.size, {
		"Content-Type": file.type
	});

	await client.connect();

	// @ts-expect-error _id refers to userId, which is a string, but the type expects an ObjectId. It works regardless.
	client.db().collection("users").updateOne({ _id: user.id }, {
		$set: {
			banner: `/api/assets/banners/${user.id}.${extension}`
		}
	});

	return new Response(JSON.stringify({
		error: false,
		message: "Successfully uploaded banner"
	}));
}