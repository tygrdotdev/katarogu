import { generateEmailVerificationCode, sendVerificationEmail } from "@/lib/auth/email"
import { Button } from "@react-email/components"

export default async function ResendCodeButton() {
	return (
		<form onClick={() => {
			resendAction()
		}}>
			<Button>
				Resend Code
			</Button>
		</form>
	)
}