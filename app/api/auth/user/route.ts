import { validateRequest } from "@/auth";

export async function GET() {
	const { user } = await validateRequest();

	if (!user) return new Response(JSON.stringify(null), { status: 401 });

	return new Response(JSON.stringify(user), { status: 200 });
}