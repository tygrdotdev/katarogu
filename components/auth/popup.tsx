"use client";

import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import React, { useState } from "react";
import { useAuth } from "./provider";
import Spinner from "../spinner";

export default function AuthPopup() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("signin");
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");

    const [loading, setLoading] = React.useState(false);

    const { signIn, register, resetPassword } = useAuth();

    const reset = () => {
        setName("");
        setEmail("");
        setUsername("");
        setPassword("");
        setPasswordConfirm("");

        setLoading(false);
    }

    const onSignIn = async () => {
        setLoading(true);

        await signIn(email, password).then((res) => {
            if (res) {
                reset();
                setOpen(false);
            } else {
                setLoading(false);
            }
        });
    };

    const onRegister = async () => {
        await register(name, username, email, password, passwordConfirm).then((res) => {
            if (res) {
                reset();
                setOpen(false);
            } else {
                setLoading(false);
            }
        });
    };

    const onReset = async () => {
        await resetPassword(email).then(() => {
            reset();
            setOpen(false);
        });
    };

    const changeMode = (mode: string) => {
        setMode(mode);
        reset();
    }

    if (isDesktop) {
        return (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Sign In</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] p-0">
                        <DialogHeader className="px-6 pt-6">
                            <DialogTitle>
                                {mode === "signin" && (
                                    "Sign in"
                                )}
                                {mode === "register" && (
                                    "Register"
                                )}
                                {mode === "reset" && (
                                    "Reset Password"
                                )}
                            </DialogTitle>
                            <DialogDescription>
                                {mode === "signin" && (
                                    "Sign in with your credentials here."
                                )}
                                {mode === "register" && (
                                    "Create an account to get started."
                                )}
                                {mode === "reset" && (
                                    "Please provide the email associated with your account to request a password reset."
                                )}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-2 py-2">
                            <div className="flex flex-col w-full gap-3 px-4">
                                {mode === "signin" && (
                                    <>
                                        <form action={onSignIn} className="flex flex-col items-center w-full gap-4">
                                            <Input placeholder="Email / Username" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <Button type="submit" className="data-[loading=true]:cursor-not-allowed w-full" disabled={loading} data-loading={loading}>
                                                {loading ? <Spinner size={16} /> : "Submit"}
                                            </Button>
                                        </form>
                                    </>
                                )}
                                {mode === "register" && (
                                    <>
                                        <form action={onRegister} className="flex flex-col items-center w-full gap-4">
                                            <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <Input placeholder="Confirm Password" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                            <Button type="submit" className="data-[loading=true]:cursor-not-allowed w-full" disabled={loading} data-loading={loading}>
                                                {loading ? <Spinner size={16} /> : "Submit"}
                                            </Button>
                                        </form>
                                    </>
                                )}
                                {mode === "reset" && (
                                    <>
                                        <form action={onReset} className="flex flex-col items-center w-full gap-4">
                                            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <Button type="submit" className="data-[loading=true]:cursor-not-allowed w-full" disabled={loading} data-loading={loading}>
                                                {loading ? <Spinner size={16} /> : "Submit"}
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </div>
                            <div className="px-6 pt-3 text-center">
                                <span>
                                    By continuing, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full gap-2 p-4 mx-auto border-t border-black/10 dark:border-white/10">
                            <div className="flex flex-col items-center gap-2">
                                {mode === "signin" && (
                                    <>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Forgot password?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => changeMode("reset")}>Reset</button>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Don&apos;t have an account?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => changeMode("register")}>Register</button>
                                        </div>
                                    </>
                                )}
                                {mode === "register" && (
                                    <>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Already have an account?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => changeMode("signin")}>Sign in</button>
                                        </div>
                                    </>
                                )}
                                {mode === "reset" && (
                                    <>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Remember your password?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => changeMode("signin")}>Sign in</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        )
    } else {
        return (
            <>
                <Drawer direction="bottom" open={open} onOpenChange={setOpen}>
                    <DrawerTrigger asChild>
                        <Button>
                            Sign In
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle className="text-3xl font-black font-display">
                                {mode === "signin" && "Sign In"}
                                {mode === "register" && "Register"}
                                {mode === "reset" && "Reset Password"}
                            </DrawerTitle>
                            <DrawerDescription>
                                {mode === "signin" && "Sign in with your credentials here."}
                                {mode === "register" && "Create an account to get started."}
                                {mode === "reset" && "Please provide the email associated with your account to request a password reset."}
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-2 pt-2">
                            <div className="flex flex-col w-full gap-3 px-4">
                                {mode === "signin" && (
                                    <>
                                        <form action={onSignIn} className="flex flex-col items-center w-full gap-4">
                                            <Input placeholder="Email / Username" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <Button type="submit" className="data-[loading=true]:cursor-not-allowed w-full" disabled={loading} data-loading={loading}>
                                                {loading ? <Spinner size={16} /> : "Submit"}
                                            </Button>
                                        </form>
                                    </>
                                )}
                                {mode === "register" && (
                                    <>
                                        <form action={onRegister} className="flex flex-col items-center w-full gap-4">
                                            <Input placeholder="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                                            <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <Input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <Input placeholder="Confirm Password" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                                            <Button type="submit" className="data-[loading=true]:cursor-not-allowed w-full" disabled={loading} data-loading={loading}>
                                                {loading ? <Spinner size={16} /> : "Submit"}
                                            </Button>
                                        </form>
                                    </>
                                )}
                                {mode === "reset" && (
                                    <>
                                        <form action={onReset} className="flex flex-col items-center w-full gap-4">
                                            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <Button type="submit" className="data-[loading=true]:cursor-not-allowed w-full" disabled={loading} data-loading={loading}>
                                                {loading ? <Spinner size={16} /> : "Submit"}
                                            </Button>
                                        </form>
                                    </>
                                )}
                            </div>
                            <div className="px-6 py-4 text-center">
                                <span>
                                    By continuing, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
                                </span>
                            </div>
                        </div>
                        <DrawerFooter>
                            <div className="flex flex-col items-center w-full gap-2 mx-auto border-t border-black/10 dark:border-white/10">
                                <div className="flex flex-col items-center gap-2 p-4">
                                    {mode === "signin" && (
                                        <>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Forgot password?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => changeMode("reset")}>Reset</button>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Don&apos;t have an account?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => changeMode("register")}>Register</button>
                                            </div>
                                        </>
                                    )}
                                    {mode === "register" && (
                                        <>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Already have an account?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => changeMode("signin")}>Sign in </button>
                                            </div>
                                        </>
                                    )}
                                    {mode === "reset" && (
                                        <>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Remember your password?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => changeMode("signin")}>Sign in</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        )
    }
}