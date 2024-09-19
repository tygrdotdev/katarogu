import { Form } from "@/components/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { requestPasswordReset, resetPassword } from "@/auth/actions/reset"

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
					</div>
					<Form action={requestPasswordReset} className="w-full flex flex-row justify-center items-center gap-4">
						<Input type="email" name="email" placeholder="Email" required className="w-fit" />
						<Button type="submit">
							Submit
						</Button>
					</Form>
				</div>
			) : (
				<div className="flex flex-col gap-4 items-center w-full h-snug justify-center">
					<div className="text-center">
						<h1 className="text-3xl font-bold">
							Set a New Password
						</h1>
						<p>
							Please enter a new password below, make sure it&apos;s secure!
						</p>
					</div>
					<Form action={resetPassword} className="w-auto flex flex-col items-center gap-4">
						<Input type="password" name="password" placeholder="New Password" required />
						<Input type="password" name="passwordConfirm" placeholder="Confirm New Password" required />
						<input type="hidden" name="token" value={searchParams.token} className="hidden" />
						<div className="flex flex-row gap-2">
							<Button type="submit">
								Submit
							</Button>
						</div>
					</Form>
				</div>
			)}
		</>
	)
}