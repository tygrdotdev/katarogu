import { validateRequest } from "@/auth";
import minio from "@/lib/minio";

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	const { user } = await validateRequest();

	if (!user) {
		return new Response("Unauthorized", {
			status: 401
		});
	}

	const avatar = await minio.presignedGetObject("public", `avatars/${params.id}`);

	return new Response(null, {
		status: 302,
		headers: {
			Location: avatar
		}
	});
}