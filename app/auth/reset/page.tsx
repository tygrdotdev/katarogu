import { PasswordResetForm, RequestPasswordResetForm } from "@/auth/actions/reset/form"

export default function ResetPasswordPage({
	searchParams
}: {
	searchParams: { token: string | null }
}) {
	return (
		<>
			{!searchParams.token ? (
				<div className="flex flex-col gap-4 items-center w-full h-snug justify-center">
					<div className="text-center">
						<h1 className="text-3xl font-bold">
							Reset Password
						</h1>
						<p className="text-neutral-500 dark:text-neutral-400">
							Please provide the email associated with your account to request a password reset.
						</p>
						<RequestPasswordResetForm />
					</div>
				</div>
			) : (
					<div className="flex flex-col gap-4 items-center w-full h-snug justify-center">
					<div className="text-center">
						<h1 className="text-3xl font-bold">
							Set a New Password
						</h1>
							<p className="text-neutral-500 dark:text-neutral-400">
							Please enter a new password below, make sure it&apos;s secure!
							</p>
							<PasswordResetForm token={searchParams.token} />
						</div>
				</div>
			)}
		</>
	)
}