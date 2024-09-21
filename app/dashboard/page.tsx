import { validateRequest } from "@/auth";
import Link from "next/link";
import AvatarUpload from "@/components/auth/account/avatar-upload";

export default async function DashboardPage() {
	const { user } = await validateRequest();

	return (
		<div className="flex flex-col w-full">
			{user ? (
				<div className="flex flex-col gap-4">
					<h1>Welcome back, {user.username} ({user.id})</h1>
					<AvatarUpload>
						Upload
					</AvatarUpload>
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
