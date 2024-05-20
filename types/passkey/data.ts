export interface PasskeyData {
	attestationType: string
	authenticator: Authenticator
	flags: Flags
	id: string
	publicKey: string
	transport: string[]
}

export interface Authenticator {
	AAGUID: string
	attachment: string
	cloneWarning: boolean
	signCount: number
}

export interface Flags {
	backupEligible: boolean
	backupState: boolean
	userPresent: boolean
	userVerified: boolean
}
