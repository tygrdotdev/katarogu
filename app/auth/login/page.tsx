import { Button } from "@/components/ui/button";
import LoginForm from "../../../auth/login/form";
import Link from "next/link";
import React from "react";

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
						{/* <div className="flex flex-col gap-4 w-full">
									<div className="w-full flex flex-row gap-4 items-center justify-center">
										<Button
											className="w-full"
											variant="outline"
											onClick={async () => await signInWithOAuth("github")}
											disabled={loading}
										>
											<Icons.Github className="w-4 h-4 xs:mr-2" />
											<span className="hidden xs:block">GitHub</span>
										</Button>

										<Button
											className="w-full"
											variant="outline"
											onClick={async () => await signInWithOAuth("google")}
											disabled={loading}
										>
											<Icons.Google className="w-4 h-4 xs:mr-2" />
											<span className="hidden xs:block">Google</span>
										</Button>

										<Button
											className="w-full"
											variant="outline"
											onClick={async () => await signInWithOAuth("discord")}
											disabled={loading}
										>
											<Icons.Discord className="w-4 h-4 xs:mr-2" />
											<span className="hidden xs:block">Discord</span>
										</Button>
									</div>
								</div>
								<div className="w-full py-2 flex items-center">
									<hr className="w-full border-t border-black/10 dark:border-white/10" />
								</div> */}
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
