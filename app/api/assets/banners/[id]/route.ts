import minio from "@/lib/minio";
import client from "@/lib/mongodb";
import { readFileSync } from "fs";

export async function GET(
	_: Request,
	{ params }: { params: { id: string } }
) {
	if (process.env.USE_S3 === "true") {
		const res = await minio.getObject("public", `banners/${params.id}`).then(async (res) => {
			let buffer = Buffer.from("");

			for await (const chunk of res) {
				buffer = Buffer.concat([buffer, chunk]);
			}

			return new Response(buffer, {
				headers: {
					"Content-Type": "image/jpeg"
				}
			});
		}).catch((_) => {
			const banner = readFileSync("public/assets/default-banner.jpg");

			return new Response(banner.buffer, {
				headers: {
					"Content-Type": "image/jpeg"
				}
			});
		});

		return res;
	} else {
		await client.connect();

		const banner = await client.db().collection("banners").findOne({
			user_id: params.id
		});

		if (!banner) {
			const banner = readFileSync("public/assets/default-banner.jpg");

			return new Response(banner.buffer, {
				headers: {
					"Content-Type": "image/jpeg"
				}
			});
		}

		return new Response(banner.data.buffer, {
			headers: {
				"Content-Type": "image/png"
			}
		});
	}
}