import { getCurrentSession } from "@/auth/sessions";
import React from "react";
import { redirect } from "next/navigation";
import PrivacyFields from "@/app/account/privacy/fields";

export default async function PrivacyPage() {
	const { user } = await getCurrentSession();

	if (!user) {
		return redirect("/auth/login");
	}

	return (
		<>
			<PrivacyFields user={user} />
		</>
	)
}