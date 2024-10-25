"use client"

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { requestPasswordReset, resetPassword } from "./actions";

export function RequestPasswordResetForm() {
	const [state, formAction] = useFormState(requestPasswordReset, {
		error: false,
		message: ""
	});

	return (
		<form
			action={formAction}
			className="flex flex-col gap-4 max-w-md w-full"
		>
			<p className="text-center">
				{state.message}
			</p>
			<RequestInnerForm />
		</form>
	)
}

function RequestInnerForm() {
	const { pending } = useFormStatus();

	return (
		<>
			<Input type="email" name="email" placeholder="Email" required />
			<Button type="submit" disabled={pending}>
				{pending ? <Spinner size={16} /> : "Submit"}
			</Button>
		</>
	)
}

export function PasswordResetForm({ token }: { token: string }) {
	const [state, formAction] = useFormState(resetPassword, {
		error: false,
		message: ""
	});

	return (
		<form
			action={formAction}
			className="flex w-full flex-col items-center gap-4"
		>
			<p className="text-center">
				{state.message}
			</p>
			<ResetInnerForm token={token} />
		</form>
	)
}

function ResetInnerForm({ token }: { token: string }) {
	const { pending } = useFormStatus();

	return (
		<>
			<Input type="password" name="password" placeholder="New Password" required disabled={pending} />
			<Input type="password" name="passwordConfirm" placeholder="Confirm New Password" required disabled={pending} />
			<input type="hidden" name="token" value={token} className="hidden" />
			<div className="flex flex-row gap-2">
				<Button type="submit" disabled={pending}>
					{pending ? <Spinner size={16} /> : "Submit"}
				</Button>
			</div>
		</>
	)
}
