"use client";

import { useAuth } from "@/components/auth/provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

function Badges() {
    return (
        <>

        </>
    )
}

export default function ProfileHeader({ children }: { children?: React.ReactNode }) {
    const { user, banner, avatar } = useAuth();

    return (
        <>
            {user && (
                <div className="flex flex-col items-start pb-8 sm:pb-0">
                    <div className="flex flex-col w-full h-full gap-3">
                        <AspectRatio ratio={4 / 1}>
                            <Image src={banner} width={1400} height={250} alt="banner" className="object-cover w-full h-full border rounded-md border-black/10 dark:border-white/10" />
                        </AspectRatio>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <div className="flex flex-col sm:flex-row h-20 px-2 text-xl font-semibold -translate-y-14 sm:-translate-y-10 sm:px-4 md:px-6 md:-translate-y-14 min-h-20 w-full">
                            <Avatar className="w-24 h-24 mb-2 border-2 sm:w-28 sm:h-28 md:w-32 md:h-32 border-black/10 dark:border-white/10"    >
                                <AvatarImage src={avatar} aria-label="User Avatar" alt="Avatar" />
                                <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-row items-center sm:pt-20 md:pt-24 justify-between sm:pl-4 w-full">
                                <span className="flex flex-col font-semibold text-black dark:text-white w-full">
                                    <span className="flex flex-row items-center gap-2">
                                        <p className="text-2xl sm:text-xl md:text-2xl font-bold w-full">
                                            {user.name}
                                        </p>
                                        {/* <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <span className="block w-2 h-2 rounded-full bg-neutral-500"></span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Offline</p>
                                </TooltipContent>
                            </Tooltip> */}
                                    </span>
                                    <span className="text-sm sm:text-sm md:text-md font-normal text-neutral-500">@{user.username}</span>
                                </span>
                                <div className="flex flex-row items-center justify-end w-full gap-2 sm:hidden">
                                    {children}
                                </div>
                                <div className="flex flex-row items-start">
                                    <Badges />
                                </div>
                            </div>
                        </div>
                        <div className="flex-row items-start flex sm:hidden">
                            <Badges />
                        </div>
                        <div className="hidden sm:flex flex-row items-center justify-end w-full gap-2 py-4">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}