import minio from "@/lib/minio";
import client from "@/lib/mongodb";
import { createAvatar } from "@dicebear/core";
import * as lorelei from "@dicebear/lorelei-neutral";
import { toPng } from "@dicebear/converter";

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
			const png = await toPng(createAvatar(lorelei, {
				seed: params.id,
				radius: 50,
				size: 128
			})).toArrayBuffer();

			return new Response(png, {
				headers: {
					"Content-Type": "image/png"
				}
			});
		});

		return res;
	} else {
		// MongoDB
		await client.connect();

		const avatar = await client.db().collection("avatars").findOne({
			user_id: params.id
		});

		if (!avatar) {
			const avatar = createAvatar(lorelei, {
				seed: params.id,
				radius: 50,
				size: 256
			}).toDataUri();

			return new Response(avatar, {
				headers: {
					"Content-Type": "image/png"
				}
			});
		}

		return new Response(avatar.data.buffer, {
			headers: {
				"Content-Type": avatar.type
			}
		});
	}
}