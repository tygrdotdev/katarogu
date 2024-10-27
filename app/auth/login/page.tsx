import { Button } from "@/components/ui/button";
import LoginForm from "../../../auth/login/form";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/icons";
import logInWithOAuth from "@/auth/oauth";
import OAuthProviders from "@/components/auth/oauth-providers";

export default function LoginPage() {
	return (
		<>
			<div className="absolute left-1/2 top-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 sm:w-1/2 md:w-auto">
				<div className="flex flex-col items-center justify-center gap-6 text-center">
					<div className="flex w-full flex-col items-center justify-center gap-2">
						<h1 className="text-center font-display text-3xl font-bold sm:text-4xl">
							Sign in to Katarogu
						</h1>
						<p className="text-sm text-neutral-500 sm:text-base">
							Please log in with your Katagoru account to continue.
						</p>
					</div>
					<div className="flex w-full flex-col items-center justify-center gap-4">
						<OAuthProviders />
						<div className="w-full py-2 flex items-center">
							<hr className="w-full border-t border-black/10 dark:border-white/10" />
						</div>
						<LoginForm />
					</div>
					<hr className="w-full border border-black/10 dark:border-white/10" />
					<div className="flex w-full flex-col items-center">
						<span>
							Forgot password?{" "}
							<Link href="/auth/reset">
								<Button
									variant={"link"}
									className="p-0 text-blue-500 dark:text-blue-500"
								>
									Reset
								</Button>
							</Link>
						</span>
						<span>
							Don&apos;t have an account?{" "}
							<Link href="/auth/register">
								<Button
									variant={"link"}
									className="p-0 text-blue-500 dark:text-blue-500"
								>
									Sign up
								</Button>
							</Link>
						</span>
					</div>
				</div>
			</div>
		</>
	)
}
