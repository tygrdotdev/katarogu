import { getCurrentSession } from "@/auth/sessions"
import VerifyAccountForm from "@/auth/verify/form";
import ProfileHeader from "@/components/profile/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
	const { user } = await getCurrentSession();

	if (!user) {
		redirect("/auth/login");
	}

	return (
		<>
			{user.email_verified ? (
				<>
					<ProfileHeader>
						<Link href="/account">
							<Button size="sm">Edit Account</Button>
						</Link>
					</ProfileHeader>
					<div className="flex flex-col gap-4 py-0 sm:flex-row sm:py-4">
						<div className="w-full sm:w-3/4">{children}</div>
					</div>
				</>
			) : (
				<div className="flex flex-col gap-4 items-center w-full h-snug justify-center">
					<div className="text-center">
						<h1 className="text-3xl font-bold">
							Almost there!
						</h1>
						<p>
							Before you can edit your account, you need to verify your email address.
						</p>
					</div>
					<VerifyAccountForm redirect="/profile" />
				</div>
			)}
		</>
	)
}