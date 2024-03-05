"use client";

import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, EyeOff, LogOut, Settings, User, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAuth } from "@/components/auth/provider";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Alert from "../alert";

export default function UserPopup() {
    const [open, setOpen] = useState(false);
    const [signOutOpen, setSignOutOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const { user, signOut, avatar, banner } = useAuth();

    function SignOutConfirmation() {
        return (
            <>
                <Alert
                    title="Are you sure?"
                    description="You are about to sign out of your account. Any unsaved changes you may have made will be lost."
                    onSubmit={() => signOut()}
                    onCancel={() => setOpen(!open)}
                    open={signOutOpen}
                    setOpen={setSignOutOpen}
                />
            </>
        )
    }

    if (isDesktop) {
        return (
            <>
                {user && (
                    <>
                        <DropdownMenu open={open} onOpenChange={setOpen}>
                            <DropdownMenuTrigger asChild className="cursor-pointer">
                                <Avatar className="border border-black/10 dark:border dark:border-white/10">
                                    <AvatarImage src={avatar} alt="Avatar" aria-label="Avatar" />
                                    <AvatarFallback>{(user.username ?? "A").slice(0, 1).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="min-w-[22rem] p-0 mr-2" side="bottom">
                                <AspectRatio ratio={3 / 1}>
                                    {!user.verified && (
                                        <div className="h-[32px] w-full absolute z-[51] top-0 bg-[#EBCB8B] text-black dark:text-black">
                                            <div className="flex flex-row items-center justify-start gap-2 max-h-[32px] p-2">
                                                <AlertTriangle className="w-4 h-4" />
                                                <p className="text-sm font-semibold">Please check your email for a verification link.</p>
                                            </div>
                                        </div>
                                    )}
                                    <Image src={banner} width={1050} height={450} alt="banner" className="object-cover w-full h-full" />
                                </AspectRatio>
                                <DropdownMenuLabel className="flex flex-col h-20 px-3 text-xl font-semibold -translate-y-16 min-h-20">
                                    <Avatar className="w-20 h-20 mb-2 border-2 border-black/10 dark:border-white/10">
                                        <AvatarImage src={avatar} aria-label="User Avatar" alt="Avatar" />
                                        <AvatarFallback>{(user.username ?? "A").slice(0, 1).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="font-semibold flex flex-row gap-2 items-center text-black dark:text-white">
                                                {user.name}
                                                {user.visibility === "private" && (
                                                    <Tooltip delayDuration={0}>
                                                        <TooltipTrigger>
                                                            <Lock size={16} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Private
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                                {user.visibility === "unlisted" && (
                                                    <Tooltip delayDuration={500}>
                                                        <TooltipTrigger>
                                                            <EyeOff size={16} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Unlisted
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                            </span>
                                            <span className="text-sm font-normal text-neutral-500">({user.username})</span>
                                        </div>
                                        <div className="flex flex-row items-start">
                                            {/* Badges */}
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <Link href="/profile">
                                    <DropdownMenuItem>
                                        <User className="w-4 h-4 mr-2" />
                                        <span>
                                            Profile
                                        </span>
                                    </DropdownMenuItem>
                                </Link>

                                <Link href="/account">
                                    <DropdownMenuItem>
                                        <Settings className="w-4 h-4 mr-2" />
                                        <span>
                                            Account
                                        </span>
                                    </DropdownMenuItem>
                                </Link>

                                <DropdownMenuItem onClick={() => {
                                    setOpen(!open)
                                    setSignOutOpen(!signOutOpen)
                                }}>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    <span>
                                        Sign out
                                    </span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <SignOutConfirmation />
                    </>
                )}
            </>
        )
    } else {
        return (
            <>
                {user && (
                    <>
                        <Drawer open={open} onOpenChange={setOpen}>
                            <DrawerTrigger asChild className="cursor-pointer">
                                <Avatar className="border border-black/10 dark:border dark:border-white/10">
                                    <AvatarImage src={avatar} alt="Avatar" aria-label="Avatar" />
                                    <AvatarFallback>{(user.username ?? "A").slice(0, 1).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </DrawerTrigger>
                            <DrawerContent className="p-0 border-0" handle={false}>
                                <AspectRatio ratio={2 / 1}>
                                    {!user.verified && (
                                        <div className="h-[32px] w-full absolute z-[51] top-0 bg-[#EBCB8B] text-black dark:text-black">
                                            <div className="flex flex-row items-center justify-start gap-2 max-h-[32px] p-2">
                                                <AlertTriangle className="w-4 h-4" />
                                                <p className="text-sm font-semibold">Please check your email for a verification link.</p>
                                            </div>
                                        </div>
                                    )}
                                    <Image src={banner} width={1050} height={450} alt="banner" className="object-cover w-full h-full rounded-t-md" />
                                </AspectRatio>
                                <div className="flex flex-col h-24 px-3 text-xl font-semibold -translate-y-12 min-h-24">
                                    <Avatar className="w-20 h-20 mb-2 border-2 border-black/10 dark:border-white/10">
                                        <AvatarImage src={avatar} aria-label="User Avatar" alt="Avatar" />
                                        <AvatarFallback>{(user.username ?? "A").slice(0, 1).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-col items-start">
                                            <span className="font-semibold flex flex-row items-center gap-2 text-black dark:text-white">
                                                {user.name}
                                                {user.visibility === "private" && (
                                                    <Tooltip delayDuration={0}>
                                                        <TooltipTrigger>
                                                            <Lock size={16} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Private
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                                {user.visibility === "unlisted" && (
                                                    <Tooltip delayDuration={500}>
                                                        <TooltipTrigger>
                                                            <EyeOff size={16} />
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            Unlisted
                                                        </TooltipContent>
                                                    </Tooltip>
                                                )}
                                            </span>
                                            <span className="text-sm font-normal text-neutral-500">({user.username})</span>
                                        </div>

                                        <div className="flex flex-row items-start">
                                            {/* Badges */}
                                        </div>
                                    </div>
                                </div>
                                <hr className="w-full border-b border-black/10 dark:border-white/10" />
                                <div className="flex flex-col items-start">
                                    <Link href="/profile" className="w-full">
                                        <DrawerClose className="w-full">
                                            <div className="flex cursor-default select-none items-center w-full p-4 text-md outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
                                                <User className="w-4 h-4 mr-2" />
                                                <span>
                                                    Profile
                                                </span>
                                            </div>
                                        </DrawerClose>
                                    </Link>
                                    <Link href="/account" className="w-full">
                                        <DrawerClose className="w-full">
                                            <div className="flex cursor-default select-none items-center w-full p-4 text-md outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
                                                <Settings className="w-4 h-4 mr-2" />
                                                <span>
                                                    Account
                                                </span>
                                            </div>
                                        </DrawerClose>
                                    </Link>
                                    <hr className="w-full border-b border-black/10 dark:border-white/10" />
                                    <DrawerClose className="w-full">
                                        <div
                                            className="flex cursor-default select-none items-center text-md outline-none p-4 transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
                                            onClick={() => setSignOutOpen(!signOutOpen)}
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            <span>
                                                Sign out
                                            </span>
                                        </div>
                                    </DrawerClose>
                                </div>
                            </DrawerContent>
                        </Drawer>

                        <SignOutConfirmation />
                    </>
                )}
            </>
        )
    }
}