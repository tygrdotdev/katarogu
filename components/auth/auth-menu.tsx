"use client";

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useMediaQuery from "@/hooks/use-media-query";
import React, { useState } from "react";
import { useAuth } from "./provider";
import Spinner from "@/components/ui/spinner";
import { Eye, EyeOff } from "lucide-react";
// import { Icons } from "@/components/ui/icons";
import { login, register } from "@/lib/auth/actions";
import { Form } from "../form";

export default function AuthMenu() {
	const [open, setOpen] = useState(false);
	const [mode, setMode] = useState<"login" | "register" | "reset">("login");
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const [loading, setLoading] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const togglePassword = () => setShowPassword(!showPassword);

	const reset = () => {
		setShowPassword(false)
		setLoading(false);
	};

	const changeMode = (mode: "login" | "register" | "reset") => {
		setMode(mode);
		reset();
	};

	if (isDesktop) {
		return (
			<>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>Sign In</Button>
					</DialogTrigger>
					<DialogContent className="p-0 sm:max-w-[425px]">
						<DialogHeader className="px-6 pt-6">
							<DialogTitle>
								{mode === "login" && "Log in"}
								{mode === "register" && "Register"}
								{mode === "reset" && "Reset Password"}
							</DialogTitle>
							<DialogDescription>
								{mode === "login" && "Log in with your credentials here."}
								{mode === "register" && "Create an account to get started."}
								{mode === "reset" &&
									"Please provide the email associated with your account to request a password reset."}
							</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col gap-2 py-2">
							<div className="flex w-full flex-col gap-3 px-4">
								{mode === "login" && (
									<>
										{/* <div className="flex flex-col gap-4">
											<div className="w-full flex flex-row gap-4 items-center justify-center">
												<Button
													className="w-full"
													variant="outline"
													onClick={async () => await onOAuthSignIn("github")}
												>
													<Icons.Github className="w-4 h-4 mr-2" />
													GitHub
												</Button>

												<Button
													className="w-full"
													variant="outline"
													onClick={async () => await onOAuthSignIn("google")}
												>
													<Icons.Google className="w-4 h-4 mr-2" />
													Google
												</Button>

												<Button
													className="w-full"
													variant="outline"
													onClick={async () => await onOAuthSignIn("discord")}
												>
													<Icons.Discord className="w-4 h-4 mr-2" />
													Discord
												</Button>
											</div>
										</div> 
										<div className="w-full py-2 flex items-center">
											<hr className="w-full border-t border-black/10 dark:border-white/10" />
										</div>
										*/}
									</>
								)}

								{mode === "login" && (
									<>
										<Form
											action={login}
											className="flex w-full flex-col items-center gap-4"
										>
											<Input
												id="email"
												name="email"
												placeholder="Email"
												type="email"
												autoComplete="email"
												disabled={loading}
											/>
											<div className="flex w-full flex-row items-center gap-2">
												<Input
													id="password"
													name="password"
													type={showPassword ? "text" : "password"}
													placeholder="Password"
													autoComplete="current-password"
													disabled={loading}
												/>
												<Button
													variant="outline"
													size="icon"
													type="button"
													className="p-2"
													onClick={togglePassword}
												>
													{showPassword ? (
														<EyeOff size={22} />
													) : (
														<Eye size={22} />
													)}
												</Button>
											</div>
											<Button
												type="submit"
												className="w-full data-[loading=true]:cursor-not-allowed"
												disabled={loading}
												data-loading={loading}
											>
												{loading ? <Spinner size={16} /> : "Submit"}
											</Button>
										</Form>
									</>
								)}
								{mode === "register" && (
									<>
										<Form
											action={register}
											className="flex w-full flex-col items-center gap-4"
										>
											<Input
												id="name"
												name="name"
												placeholder="Name"
												type="text"
												autoComplete="name"
											/>
											<Input
												id="email"
												name="email"
												placeholder="Email"
												type="email"
												autoComplete="email"
											/>
											<Input
												id="username"
												name="username"
												placeholder="Username"
												type="text"
												autoComplete="username"
											/>
											<div className="flex w-full flex-row items-center gap-2">
												<Input
													id="password"
													name="password"
													type={showPassword ? "text" : "password"}
													placeholder="Password"
													autoComplete="new-password"
												/>
												<Button
													variant="outline"
													size="icon"
													type="button"
													className="p-2"
													onClick={togglePassword}
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
												placeholder="Confirm Password"
												type={showPassword ? "text" : "password"}
												autoComplete="new-password"
											/>
											<Button
												type="submit"
												className="w-full data-[loading=true]:cursor-not-allowed"
												disabled={loading}
												data-loading={loading}
											>
												{loading ? <Spinner size={16} /> : "Submit"}
											</Button>
										</Form>
									</>
								)}
								{mode === "reset" && (
									<>
										{/* <Form
											action={reset}
											className="flex w-full flex-col items-center gap-4"
										>
											<Input
												id="email"
												name="email"
												placeholder="Email"
												autoComplete="email"
											/>
											<Button
												type="submit"
												className="w-full data-[loading=true]:cursor-not-allowed"
												disabled={loading}
												data-loading={loading}
											>
												{loading ? <Spinner size={16} /> : "Submit"}
											</Button>
										</Form> */}
									</>
								)}
							</div>
							<div className="px-6 pt-3 text-center">
								<span className="text-sm">
									By continuing, you agree to our{" "}
									<a href="#" className="text-blue-500 hover:underline">
										Terms of Service
									</a>{" "}
									and{" "}
									<a href="#" className="text-blue-500 hover:underline">
										Privacy Policy
									</a>
									.
								</span>
							</div>
						</div>
						<div className="mx-auto flex w-full flex-col items-center gap-2 border-t border-black/10 p-4 dark:border-white/10">
							<div className="flex flex-col items-center gap-2">
								{mode === "login" && (
									<>
										<div className="flex flex-row gap-2">
											<span>Forgot password?</span>
											<button
												className="text-blue-500 hover:underline"
												onClick={() => changeMode("reset")}
											>
												Reset
											</button>
										</div>
										<div className="flex flex-row gap-2">
											<span>Don&apos;t have an account?</span>
											<button
												className="text-blue-500 hover:underline"
												onClick={() => changeMode("register")}
											>
												Register
											</button>
										</div>
									</>
								)}
								{mode === "register" && (
									<>
										<div className="flex flex-row gap-2">
											<span>Already have an account?</span>
											<button
												className="text-blue-500 hover:underline"
												onClick={() => changeMode("login")}
											>
												Log in
											</button>
										</div>
									</>
								)}
								{mode === "reset" && (
									<>
										<div className="flex flex-row gap-2">
											<span>Remember your password?</span>
											<button
												className="text-blue-500 hover:underline"
												onClick={() => changeMode("login")}
											>
												Log in
											</button>
										</div>
									</>
								)}
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</>
		);
	} else {
		return (
			<>
				<Drawer direction="bottom" open={open} onOpenChange={setOpen}>
					<DrawerTrigger asChild>
						<Button>Sign In</Button>
					</DrawerTrigger>
					<DrawerContent>
						<DrawerHeader>
							<DrawerTitle className="font-display text-3xl font-black">
								{mode === "login" && "Log In"}
								{mode === "register" && "Register"}
								{mode === "reset" && "Reset Password"}
							</DrawerTitle>
							<DrawerDescription>
								{mode === "login" && "Log in with your credentials here."}
								{mode === "register" && "Create an account to get started."}
								{mode === "reset" &&
									"Please provide the email associated with your account to request a password reset."}
							</DrawerDescription>
						</DrawerHeader>
						<div className="flex flex-col gap-2 pt-2">
							<div className="flex w-full flex-col gap-3 px-4">
								{mode === "login" && (
									<>
										{/* <div className="flex flex-col gap-4">
											<div className="w-full flex flex-row gap-4 items-center justify-center">
												<Button
													className="w-full"
													variant="outline"
													onClick={async () => await onOAuthSignIn("github")}
												>
													<Icons.Github className="w-4 h-4 mr-2" />
													<span className="hidden xs:block">GitHub</span>
												</Button>

												<Button
													className="w-full"
													variant="outline"
													onClick={async () => await onOAuthSignIn("google")}
												>
													<Icons.Google className="w-4 h-4 mr-2" />
													<span className="hidden xs:block">Google</span>
												</Button>

												<Button
													className="w-full"
													variant="outline"
													onClick={async () => await onOAuthSignIn("discord")}
												>
													<Icons.Discord className="w-4 h-4 mr-2" />
													<span className="hidden xs:block">Discord</span>
												</Button>
											</div>
										</div>
										<div className="w-full py-2 flex items-center">
											<hr className="w-full border-t border-black/10 dark:border-white/10" />
										</div> */}
									</>
								)}
								{mode === "login" && (
									<>
										<Form
											action={login}
											className="flex w-full flex-col items-center gap-4"
										>
											<Input
												id="email"
												name="email"
												placeholder="Email"
												type="email"
											/>
											<Input
												id="password"
												name="password"
												placeholder="Password"
												type="password"
											/>
											<Button
												type="submit"
												className="w-full data-[loading=true]:cursor-not-allowed"
												disabled={loading}
												data-loading={loading}
											>
												{loading ? <Spinner size={16} /> : "Submit"}
											</Button>
										</Form>
									</>
								)}
								{mode === "register" && (
									<>
										<Form
											action={register}
											className="flex w-full flex-col items-center gap-4"
										>
											<Input
												id="name"
												name="name"
												placeholder="Name"
												type="text"
											/>
											<Input
												id="email"
												name="email"
												placeholder="Email"
												type="email"
											/>
											<Input
												id="username"
												name="username"
												placeholder="Username"
												type="text"
											/>
											<Input
												id="password"
												name="password"
												placeholder="Password"
												type="password"
											/>
											<Input
												id="passwordConfirm"
												name="passwordConfirm"
												placeholder="Confirm Password"
												type="password"
											/>
											<Button
												type="submit"
												className="w-full data-[loading=true]:cursor-not-allowed"
												disabled={loading}
												data-loading={loading}
											>
												{loading ? <Spinner size={16} /> : "Submit"}
											</Button>
										</Form>
									</>
								)}
								{mode === "reset" && (
									<>
										{/* <Form
											action={reset}
											className="flex w-full flex-col items-center gap-4"
										>
											<Input
												id="email"
												name="email"
												placeholder="Email"
											/>
											<Button
												type="submit"
												className="w-full data-[loading=true]:cursor-not-allowed"
												disabled={loading}
												data-loading={loading}
											>
												{loading ? <Spinner size={16} /> : "Submit"}
											</Button>
										</Form> */}
									</>
								)}
							</div>
							<div className="px-6 py-4 text-center">
								<span>
									By continuing, you agree to our{" "}
									<a href="#" className="text-blue-500 hover:underline">
										Terms of Service
									</a>{" "}
									and{" "}
									<a href="#" className="text-blue-500 hover:underline">
										Privacy Policy
									</a>
									.
								</span>
							</div>
						</div>
						<DrawerFooter>
							<div className="mx-auto flex w-full flex-col items-center gap-2 border-t border-black/10 dark:border-white/10">
								<div className="flex flex-col items-center gap-2 p-4">
									{mode === "login" && (
										<>
											<div className="flex flex-row gap-2">
												<span>Forgot password?</span>
												<button
													className="text-blue-500 hover:underline"
													onClick={() => changeMode("reset")}
												>
													Reset
												</button>
											</div>
											<div className="flex flex-row gap-2">
												<span>Don&apos;t have an account?</span>
												<button
													className="text-blue-500 hover:underline"
													onClick={() => changeMode("register")}
												>
													Register
												</button>
											</div>
										</>
									)}
									{mode === "register" && (
										<>
											<div className="flex flex-row gap-2">
												<span>Already have an account?</span>
												<button
													className="text-blue-500 hover:underline"
													onClick={() => changeMode("login")}
												>
													Log in{" "}
												</button>
											</div>
										</>
									)}
									{mode === "reset" && (
										<>
											<div className="flex flex-row gap-2">
												<span>Remember your password?</span>
												<button
													className="text-blue-500 hover:underline"
													onClick={() => changeMode("login")}
												>
													Log in
												</button>
											</div>
										</>
									)}
								</div>
							</div>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</>
		);
	}
}