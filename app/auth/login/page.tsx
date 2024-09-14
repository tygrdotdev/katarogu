"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/form"
import Link from "next/link";
import { login } from "../actions";
import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
	const [showPassword, setShowPassword] = React.useState(false);
	const togglePassword = () => setShowPassword((prev) => !prev);
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
						<Form
							className="flex flex-col gap-4 w-full"
							action={login}
						>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Email"
							/>
							<div className="flex w-full flex-row items-center gap-2">
								<Input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="Password"
								/>
								<Button
									variant="outline"
									size="icon"
									className="p-2"
									onClick={togglePassword}
									type="button"
								>
									{showPassword ? (
										<EyeOff size={22} />
									) : (
										<Eye size={22} />
									)}
								</Button>
							</div>
							<Button className="text-md w-full">
								Submit
							</Button>
							<small className="px-2 pt-2 text-center text-neutral-500 dark:text-neutral-400">
								By continuing, you agree to our{" "}
								<a className="text-blue-500" href="/tos">
									Terms of Service
								</a>{" "}
								and{" "}
								<a className="text-blue-500" href="/privacy">
									Privacy Policy
								</a>
								.
							</small>
						</Form>
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

