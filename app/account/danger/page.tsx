import { getCurrentSession } from "@/auth/sessions"
import { redirect } from "next/navigation";
import { DeleteAccountConfirm } from "./confirm"
import { Button } from "@/components/ui/button"

export default async function DangerZonePage() {
	const { user } = await getCurrentSession();

	if (!user) {
		return redirect("/auth/login");
	}

	return (
		<>
			<div className="flex flex-col gap-4 pb-4 sm:gap-8">
				<div className="flex w-full flex-col rounded-md border border-red-500/40">
					<div className="flex flex-col gap-4 border-b border-red-500/40 p-6">
						<div className="flex flex-col gap-2">
							<h1 className="text-xl font-bold">Delete Account</h1>
							<p className="text-sm">
								Permanently delete your account and all of its contents from
								the Katarogu platform. This action is not reversible, so
								please continue with caution.
							</p>
						</div>
					</div>
					<div className="flex flex-row items-center justify-between gap-4 bg-red-500/10 p-4">
						<div />
						<DeleteAccountConfirm user={user}>
							<Button variant="destructive">Delete Account</Button>
						</DeleteAccountConfirm>
					</div>
				</div>
			</div>
		</>
	)
}