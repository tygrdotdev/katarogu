"use server";

import { validateRequest } from "@/auth";
import { ActionResult } from "@/components/form";
import minio from "@/lib/minio";
import client from "@/lib/mongodb";

export async function uploadAvatar(formData: FormData): Promise<ActionResult> {
	"use server";
	const { user } = await validateRequest();

	console.log(user);

	if (!user) {
		return {
			error: true,
			message: "Unauthorized"
		}
	};

	const file = formData.get("file") as File;

	console.log(file);

	if (file.size < 1) {
		return {
			error: true,
			message: "No file selected"
		}
	}

	if (file.size > 12 * 1024 * 1024) {
		return {
			error: true,
			message: "File too large"
		}
	}

	const exists = await minio.bucketExists("public");

	if (!exists) {
		await minio.makeBucket("public");
	}

	// grab the file extension
	const extension = file.name.split(".").pop();

	await minio.putObject("public", `avatars/${user.id}.${extension}`, Buffer.from(await file.arrayBuffer()), file.size, {
		"Content-Type": file.type
	});

	await client.connect();

	// @ts-expect-error _id refers to userId, which is a string, but the type expects an ObjectId. It works regardless.
	client.db().collection("users").updateOne({ _id: user.id }, {
		$set: {
			avatar: `/api/assets/avatars/${user.id}.${extension}`
		}
	});

	return {
		error: false,
		message: "Successfully uploaded avatar"
	}
}

export async function uploadBanner(file: File): Promise<ActionResult> {
	"use server";
	const { user } = await validateRequest();

	if (!user) {
		return {
			error: true,
			message: "Unauthorized"
		}
	};

	if (file.size < 1) {
		return {
			error: true,
			message: "No file selected"
		}
	}

	if (file.size > 12 * 1024 * 1024) {
		return {
			error: true,
			message: "File too large"
		}
	}

	const exists = await minio.bucketExists("public");

	if (!exists) {
		await minio.makeBucket("public");
	}

	// grab the file extension
	const extension = file.name.split(".").pop();

	await minio.putObject("public", `banners/${user.id}.${extension}`, Buffer.from(await file.arrayBuffer()), file.size, {
		"Content-Type": file.type
	});

	await client.connect();

	// @ts-expect-error _id refers to userId, which is a string, but the type expects an ObjectId. It works regardless.
	client.db().collection("users").updateOne({ _id: user.id }, {
		$set: {
			banner: `/api/assets/banners/${user.id}.${extension}`
		}
	});

	return {
		error: false,
		message: "Successfully uploaded banner"
	}
}