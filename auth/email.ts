export function verifyEmailInput(email: string): boolean {
	return /^.+@.+\..+$/.test(email) && email.length < 256;
}