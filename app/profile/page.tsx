"use client";

import ProtectedPage from "@/components/auth/protected";
import { useAuth } from "@/components/auth/provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import ProfileStats from "./overview";
import ProfileAnimeList from "./anime";
import ProfileMangaList from "./manga";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function ProfilePage() {
    const { user, banner, avatar } = useAuth();
    console.log(avatar)
    return (
        <ProtectedPage>
            {user && (
                <>
                    <div className="flex flex-col items-start pb-6 sm:pb-8 md:pb-12">
                        <div className="flex flex-col w-full h-full gap-3">
                            <AspectRatio ratio={4 / 1}>
                                <Image src={banner} width={1400} height={250} alt="banner" className="object-cover w-full h-full border border-black/10 dark:border-white/10 rounded-md" />
                            </AspectRatio>
                        </div>
                        <div className="flex flex-row gap-4 w-full justify-between">
                            <div className="flex flex-col px-6 text-xl font-semibold -translate-y-12 md:-translate-y-16 min-h-20 h-20">
                                <Avatar className="mb-2 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 border-2 border-black/10 dark:border-white/10"    >
                                    <AvatarImage src={avatar} aria-label="User Avatar" alt="Avatar" />
                                    <AvatarFallback>{user.username.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-row gap-4 justify-between items-center">
                                    <span className="text-black flex flex-col gap-0 dark:text-white font-semibold">
                                        <span className="flex flex-row gap-2 items-center">
                                            <p>
                                                {user.username}
                                            </p>
                                            <Tooltip delayDuration={0}>
                                                <TooltipTrigger>
                                                    <span className="block w-3 h-3 bg-neutral-500 rounded-full"></span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Offline</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </span>
                                        <span className="text-neutral-500 font-normal text-sm">({user.email})</span>
                                    </span>
                                    <div className="flex flex-row items-start">
                                        {/* Badges */}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-end w-full py-4">
                                <Link href="/account">
                                    <Button>
                                        Edit Profile
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 items-center px-2">

                        <div className="w-full flex flex-col gap-3">
                            <Tabs defaultValue="timeline" className="w-full">
                                <TabsList className="w-full justify-start overflow-x-scroll scrollbar-none">
                                    <TabsTrigger value="overview" className="w-full">Overview</TabsTrigger>
                                    <TabsTrigger value="anime" className="w-full">Anime List</TabsTrigger>
                                    <TabsTrigger value="manga" className="w-full">Manga List</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview">
                                    <ProfileStats />
                                </TabsContent>
                                <TabsContent value="anime">
                                    <ProfileAnimeList />
                                </TabsContent>
                                <TabsContent value="manga">
                                    <ProfileMangaList />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </>
            )}
        </ProtectedPage>
    )
}