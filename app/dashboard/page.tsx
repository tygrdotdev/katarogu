"use client";
import { useAuth } from "@/components/auth/provider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
	const { user } = useAuth();

	useEffect(() => {
		if (!user) redirect("/");
	}, [user]);

	return (
		<>
			{user && (
				<h1 className="p-2 text-3xl font-bold">
					Welcome back, {user.username}!
				</h1>
			)}
		</>
	);
}
