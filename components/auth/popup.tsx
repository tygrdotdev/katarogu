"use client";

import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react"

export default function AuthPopup() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
        return (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Sign In</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        {/* COntent here */}
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
                            <DrawerTitle className="text-3xl font-black font-display">Sign in</DrawerTitle>
                            <DrawerDescription>Sign in with your credentials here.</DrawerDescription>
                        </DrawerHeader>
                        <div className="flex flex-col gap-2 pt-2 pb-6">
                            <div className="flex flex-col w-full gap-3 px-4">
                                <Input placeholder="Email / Username" />
                                <Input placeholder="Password" />
                                <Button>Submit</Button>
                            </div>
                            <div className="px-6 py-3 text-center">
                                <span>
                                    By continuing, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.
                                </span>
                            </div>
                        </div>
                        <DrawerFooter>
                            <div className="flex flex-col items-center w-full gap-2 mx-auto border-t border-black/10 dark:border-white/10">
                                <div className="flex flex-col items-center gap-2 p-4">
                                    <div className="flex flex-row gap-2">
                                        <span>
                                            Forgot password?
                                        </span>
                                        <a href="#" className="text-blue-500 hover:underline">Reset</a>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <span>
                                            Don&apos;t have an account?
                                        </span>
                                        <a href="#" className="text-blue-500 hover:underline">Register</a>
                                    </div>
                                </div>
                            </div>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>
        )
    }
}