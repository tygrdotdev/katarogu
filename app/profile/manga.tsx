"use client";

import { useAuth } from "@/components/auth/provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import pb from "@/lib/pocketbase";
import { MangaProgress } from "@/types/manga/progress";
import { User } from "@/types/user";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProfileMangaList() {
    const { user } = useAuth();

    const [mangaList, setMangaList] = useState<MangaProgress[]>();

    async function getMangaList() {
        if (user) {
            await pb.collection<User>("users").getOne(user.id, {
                expand: "manga_list.entry",
            }).then((res) => {
                setMangaList(res.expand?.manga_list)
            });
        }
    }

    useEffect(() => {
        if (user) {
            getMangaList();

            pb.collection("users").subscribe(user.id, (manga) => {
                getMangaList();
            });
        }
    }, []);

    return (
        <>
            {user && (
                <>
                    <div className="grid xs:grid-cols-1 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 py-4 w-full h-full">
                        {mangaList && mangaList.map((manga: MangaProgress) => (
                            <Link href={`/manga/${manga.expand?.entry.id}`} passHref key={manga.expand?.entry.id}>
                                <div className="flex border-black/10 dark:border-white/10 rounded-md w-full h-fit gap-2 flex-row group">
                                    <div className="h-full rounded-md overflow-hidden w-1/3">
                                        <Image src={`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/manga/${manga.expand?.entry.id}/${manga.expand?.entry.cover}`} alt={manga.expand?.entry.title + " cover"} width={150} height={300} className="w-fit h-fit rounded-md group-hover:scale-105 transition-all  border-black/10 dark:border-white/10" />
                                    </div>
                                    <p className="text-xl font-medium w-full">
                                        {manga.expand?.entry.title}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </>
    )
}