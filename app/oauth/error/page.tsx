"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation"

export default function OAuthErrorPage() {
	const params = useSearchParams()
	const error_code = params.get("error_code");

	return (
		<div className="flex flex-col w-full min-h-snug justify-center items-center gap-4 text-center">
			<div className="flex flex-col gap-0">
				<h1 className="text-3xl font-bold">
					Something went wrong!
				</h1>
				<p className="text-neutral-500">
					{error_code ? (
						<>
							{error_code === "invalid_request" && "The internet gods have spoken, and they say your request is invalid. Please try again."}
							{error_code === "email_not_verified" && "Failed to link to existing account as the email has not been verified yet. If you own this account, verify your email and try again."}
							{error_code === "auto_link_disabled" && "An account with this email already exists and has OAuth Link disabled. If you own this account, enable it and try again."}
							{error_code === "oauth_email_unverified" && "The email associated with this OAuth2 account has not been verified. Please verify your email and try again."}
							{error_code === "account_already_linked" && "This OAuth2 account is already linked to another account."}
						</>
					) : (
						"An unknown error occurred. Please try again."
					)}
				</p>
			</div>
			<Link href="/auth/login">
				<Button onClick={() => window.close()}>
					Close Window
				</Button>
			</Link>
		</div>
	)
}