import minio from "@/lib/minio";
import client from "@/lib/mongodb";

export async function GET(
	_: Request,
	{ params }: { params: { id: string } }
) {
	if (process.env.USE_S3 === "true") {
		// S3
		let res = await minio.getObject("public", `avatars/${params.id}`).then(async (res) => {
			let buffer = Buffer.from("");

			for await (const chunk of res) {
				buffer = Buffer.concat([buffer, chunk]);
			}

			return new Response(buffer, {
				headers: {
					"Content-Type": "image/png"
				}
			});
		}).catch(async (err) => {
			return new Response("Failed to find avatar", {
				status: 404
			});
		});

		return res;
	} else {
		// MongoDB
		await client.connect();

		const avatar = await client.db().collection("avatars").findOne({
			user_id: params.id
		});

		if (avatar === null) {
			return new Response("Failed to find avatar", {
				status: 404
			});
		}

		return new Response(avatar.data.buffer, {
			headers: {
				"Content-Type": avatar.type
			}
		});
	}
}