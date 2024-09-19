import { Form } from "@/components/form";
import { validateRequest } from "@/auth";
import Link from "next/link";
import { logout } from "@/auth/actions/logout";

export default async function DashboardPage() {
	const { user } = await validateRequest();

	return (
		<div className="flex flex-col w-full">
			{user ? (
				<div>
					<h1>Welcome back, {user.username} ({user.id})</h1>
					<Form action={logout}>
						<button>Log out</button>
					</Form>
				</div>
			) : (
				<div className="flex flex-row gap-3">
					<Link href="/auth/login">
						<button>
							Log in
						</button>
					</Link>
					<Link href="/auth/register">
						<button>
							Register
						</button>
					</Link>
				</div>
			)}
		</div>
	);
}
