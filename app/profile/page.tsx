"use client";

import ProtectedPage from "@/components/auth/protected";
import { useAuth } from "@/components/auth/provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileStats from "./overview";
import ProfileAnimeList from "./anime";
import ProfileMangaList from "./manga";
import ProfileHeader from "@/components/profile/header";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <ProtectedPage>
            {user && (
                <>
                    <div className="flex flex-col w-full h-full sm:gap-2 md:gap-4">
                        <ProfileHeader>
                            <Link href="/account">
                                <Button size="sm">
                                    Edit Account
                                </Button>
                            </Link>
                        </ProfileHeader>
                        <div className="flex flex-row items-center gap-3 px-2">
                            <div className="flex flex-col w-full gap-3">
                                <Tabs defaultValue="overview" className="w-full">
                                    <TabsList className="justify-start w-full overflow-x-scroll scrollbar-none">
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
                    </div>
                </>
            )}
        </ProtectedPage>
    )
}