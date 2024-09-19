"use client"

import { resendVerificationEmail } from "@/auth/actions/verify"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useState } from "react";

export default function ResendCodeButton() {
	const [loading, setLoading] = useState(false);

	return (
		<Button variant="outline" type="button" disabled={loading} onClick={async () => {
			setLoading(true);
			await resendVerificationEmail().then(() => {
				toast.success("Success!", {
					description: "Please check your email for a new verification code."
				});
			}).catch((err) => {
				toast.error("Something went wrong!", {
					description: err.error
				});
			}).finally(() => {
				setLoading(false);
			});
		}}>
			Resend Code
		</Button>
	)
}