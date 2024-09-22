import ProfileHeader from "@/components/profile/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AccountNavigation from "./nav";
import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = await validateRequest();

	if (!user) {
		redirect("/auth/login");
	}

	return (
		<>
			{user && (
				<>
					<ProfileHeader>
						<Link href="/profile">
							<Button size="sm">View Profile</Button>
						</Link>
					</ProfileHeader>
					<div className="flex flex-col gap-4 py-0 sm:flex-row sm:py-4">
						<AccountNavigation />
						<div className="w-full sm:w-3/4">{children}</div>
					</div>
				</>
			)}
		</>
	);
}