import { getCurrentSession } from "@/auth/sessions";
import Link from "next/link";

export default async function DashboardPage() {
	const { user } = await getCurrentSession();

	return (
		<div className="flex flex-col w-full">
			{user ? (
				<div className="flex flex-col gap-4">
					<h1>Welcome back, {user.username} ({user.id})</h1>
					<code>
						{JSON.stringify(user, null, 2)}
					</code>
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