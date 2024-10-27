import { getCurrentSession } from "@/auth/sessions"
import OAuthFields from "./fields";
import { redirect } from "next/navigation";

export default async function OAuthSettingsPage() {
	const { user } = await getCurrentSession();

	if (!user) {
		redirect("/auth/login");
	}

	return (
		<>
			<div className="flex flex-col gap-4 pb-4 sm:gap-8">
				<OAuthFields user={user} />
			</div>
		</>
	)
}