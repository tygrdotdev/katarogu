import minio from "@/lib/minio";
import client from "@/lib/mongodb";

export async function GET(
	_: Request,
	{ params }: { params: { id: string } }
) {
	if (process.env.USE_S3 === "true") {
		// S3
		let res = await minio.getObject("public", `character_covers/${params.id}`).then(async (res) => {
			let buffer = Buffer.from("");

			for await (const chunk of res) {
				buffer = Buffer.concat([buffer, chunk]);
			}

			return new Response(buffer, {
				headers: {
					"Content-Type": "image/png",
					"Cache-Control": "public, max-age=300",
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

		const cover = await client.db().collection<{ _id: string, data: Buffer, type: string }>("character_covers").findOne({
			_id: params.id
		});

		if (cover === null) {
			return new Response("Failed to find cover", {
				status: 404
			});
		}

		return new Response(cover.data.buffer, {
			headers: {
				"Content-Type": cover.type,
				"Cache-Control": "public, max-age=300"
			}
		});
	}
}