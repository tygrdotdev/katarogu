"use client";

import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";

export default function AuthPopup() {
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState("signin");
    const isDesktop = useMediaQuery('(min-width: 768px)');

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
                                        <Input placeholder="Email / Username" type="email" />
                                        <Input placeholder="Password" type="password" />
                                        <Button>Submit</Button>
                                    </>
                                )}
                                {mode === "register" && (
                                    <>
                                        <Input placeholder="Email" />
                                        <Input placeholder="Username" />
                                        <Button>
                                            GO!
                                        </Button>
                                    </>
                                )}
                                {mode === "reset" && (
                                    <>
                                        <Input placeholder="Email" />
                                        <Button>
                                            Submit
                                        </Button>
                                    </>
                                )}
                            </div>
                            <div className="px-6 pt-3 text-center">
                                <span>
                                    By continuing, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full gap-2 mx-auto border-t border-black/10 dark:border-white/10 p-4">
                            <div className="flex flex-col items-center gap-2">
                                {mode === "signin" && (
                                    <>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Forgot password?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => setMode("reset")}>Reset</button>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Don&apos;t have an account?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => setMode("register")}>Register</button>
                                        </div>
                                    </>
                                )}
                                {mode === "register" && (
                                    <>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Already have an account?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => setMode("signin")}>Sign in </button>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Forgot password?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => setMode("reset")}>Reset</button>
                                        </div>
                                    </>
                                )}
                                {mode === "reset" && (
                                    <>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Already have an account?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => setMode("signin")}>Sign in </button>
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <span>
                                                Don&apos;t have an account?
                                            </span>
                                            <button className="text-blue-500 hover:underline" onClick={() => setMode("register")}>Register</button>
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
                                        <Input placeholder="Email / Username" />
                                        <Input placeholder="Password" />
                                        <Button>Submit</Button>
                                    </>
                                )}
                                {mode === "register" && (
                                    <>
                                        <Input placeholder="Email" />
                                        <Input placeholder="Username" />
                                        <Button>
                                            GO!
                                        </Button>
                                    </>
                                )}
                                {mode === "reset" && (
                                    <>
                                        <Input placeholder="Email" />
                                        <Button>
                                            Submit
                                        </Button>
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
                                                <button className="text-blue-500 hover:underline" onClick={() => setMode("reset")}>Reset</button>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Don&apos;t have an account?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => setMode("register")}>Register</button>
                                            </div>
                                        </>
                                    )}
                                    {mode === "register" && (
                                        <>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Already have an account?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => setMode("signin")}>Sign in </button>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Forgot password?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => setMode("reset")}>Reset</button>
                                            </div>
                                        </>
                                    )}
                                    {mode === "reset" && (
                                        <>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Already have an account?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => setMode("signin")}>Sign in </button>
                                            </div>
                                            <div className="flex flex-row gap-2">
                                                <span>
                                                    Don&apos;t have an account?
                                                </span>
                                                <button className="text-blue-500 hover:underline" onClick={() => setMode("register")}>Register</button>
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