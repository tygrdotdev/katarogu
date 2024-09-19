"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form } from "@/components/form"
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { register } from "@/auth/actions/register";
import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
	const { pending } = useFormStatus();
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
						<Form className="flex flex-col gap-4 w-full" action={register}>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder="Full Name"
								disabled={pending}
							/>
							<Input
								id="username"
								name="username"
								type="text"
								placeholder="Username"
								disabled={pending}
							/>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="Email"
								disabled={pending}
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
							<Input
								id="passwordConfirm"
								name="passwordConfirm"
								type={showPassword ? "text" : "password"}
								placeholder="Password Confirmation"
							/>
							<Button className="text-md w-full">
								Create Account
							</Button>
						</Form>
					</div>
					<hr className="w-full border border-black/10 dark:border-white/10" />
					<div className="flex w-full flex-col items-center">
						<span>
							Already have an account?{" "}
							<Link href="/auth/login">
								<Button
									variant={"link"}
									className="p-0 text-blue-500 dark:text-blue-500"
								>
									Sign in
								</Button>
							</Link>
						</span>
					</div>
				</div>
			</div>
		</>
	)
}