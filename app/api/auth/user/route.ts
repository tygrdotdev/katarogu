import { validateRequest } from "@/lib/auth";

export async function GET() {
	const { user } = await validateRequest();

	if (!user) return new Response(JSON.stringify(null), { status: 403 });

	return new Response(JSON.stringify(user), { status: 200 });
}