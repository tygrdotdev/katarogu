import ProfileHeader from "@/components/profile/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/auth/sessions";
import AccountNavigation from "./nav";

export default async function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { user } = await getCurrentSession();

	if (!user) {
		redirect("/auth/login");
	}

	if (!user.email_verified) {
		redirect("/auth/verify");
	}

	return (
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
	);
}