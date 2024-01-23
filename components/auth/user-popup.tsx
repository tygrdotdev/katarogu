"use client";

import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAuth } from "@/components/auth/provider";
import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../ui/drawer";

export default function UserPopup() {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const { user, signOut, avatar, banner } = useAuth();

    if (isDesktop) {
        return (
            <>
                {user && (
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                            <Avatar className="border border-black/10 dark:border dark:border-white/10">
                                <AvatarImage src={avatar} alt="Avatar" aria-label="Avatar" />
                                <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="min-w-[22rem] p-0 mr-2" side="bottom">
                            <AspectRatio ratio={2 / 1}>
                                {!user.verified && (
                                    <div className="h-[32px] w-full absolute z-[51] top-0 bg-[#EBCB8B] text-black dark:text-black">
                                        <div className="flex flex-row items-center justify-start gap-2 max-h-[32px] p-2">
                                            <AlertTriangle className="w-4 h-4" />
                                            <p className="text-sm font-semibold">Please check your email for a verification link.</p>
                                        </div>
                                    </div>
                                )}
                                <Image src={banner} width={350} height={150} alt="banner" className="object-cover w-full h-full" />
                            </AspectRatio>
                            <DropdownMenuLabel className="flex flex-col px-3 text-xl font-semibold -translate-y-16 min-h-16 h-16">
                                <Avatar className="mb-2 w-20 h-20 border-2 border-black/10 dark:border-white/10">
                                    <AvatarImage src={avatar} aria-label="User Avatar" alt="Avatar" />
                                    <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-black dark:text-white font-semibold">
                                        {user.username} <span className="text-neutral-500 font-normal text-sm">({user.email})</span>
                                    </span>
                                    <div className="flex flex-row items-start">
                                        {/* Badges */}
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />

                            <Link href="/profile">
                                <DropdownMenuItem>
                                    <User className="mr-2 w-4 h-4" />
                                    <span>
                                        Profile
                                    </span>
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem onClick={() => signOut()}>
                                <LogOut className="mr-2 w-4 h-4" />
                                <span>
                                    Sign out
                                </span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </>
        )
    } else {
        return (
            <>
                {user && (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild className="cursor-pointer">
                            <Avatar className="border border-black/10 dark:border dark:border-white/10">
                                <AvatarImage src={avatar} alt="Avatar" aria-label="Avatar" />
                                <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
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
                                <Image src={banner} width={350} height={150} alt="banner" className="object-cover w-full h-full rounded-t-md" />
                            </AspectRatio>
                            <div className="flex flex-col px-3 text-xl font-semibold -translate-y-12 min-h-20 h-20">
                                <Avatar className="mb-2 w-20 h-20 border-2 border-black/10 dark:border-white/10">
                                    <AvatarImage src={avatar} aria-label="User Avatar" alt="Avatar" />
                                    <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-black dark:text-white font-semibold">
                                        {user.username} <span className="text-neutral-500 font-normal text-sm">({user.email})</span>
                                    </span>
                                    <div className="flex flex-row items-start">
                                        {/* Badges */}
                                    </div>
                                </div>
                            </div>
                            <hr className="w-full border-b border-black/10 dark:border-white/10" />
                            <div className="flex flex-col items-start">
                                <Link href="/profile" className="w-full">
                                    <DrawerClose>
                                        <div className="flex cursor-default select-none items-center w-full p-4 text-md outline-none transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50">
                                            <User className="mr-2 w-4 h-4" />
                                            <span>
                                                Profile
                                            </span>
                                        </div>
                                    </DrawerClose>
                                </Link>
                                <hr className="w-full border-b border-black/10 dark:border-white/10" />
                                <DrawerClose>
                                    <div className="flex cursor-default select-none items-center text-md outline-none p-4 transition-colors focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-neutral-800 dark:focus:text-neutral-50" onClick={() => signOut()}>
                                        <LogOut className="mr-2 w-4 h-4" />
                                        <span>
                                            Sign out
                                        </span>
                                    </div>
                                </DrawerClose>
                            </div>
                        </DrawerContent>
                    </Drawer>
                )}
            </>
        )
    }
}