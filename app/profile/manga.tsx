"use client";

import { useAuth } from "@/components/auth/provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Manga from "@/types/manga";
import Image from "next/image"
import Link from "next/link";

export default function ProfileMangaList() {
    const { user, mangaList } = useAuth();

    return (
        <>
            {user && (
                <>
                    <div className="grid grid-cols-6 gap-6 py-4 w-full h-full">
                        {mangaList && mangaList.map((manga: Manga) => (
                            <Link href={`/manga/${manga.id}`} passHref key={manga.id}>
                                <div className="flex border-black/10 dark:border-white/10 rounded-md w-full h-fit gap-2 flex-col group">
                                    <AspectRatio ratio={2 / 3} className="w-full h-full rounded-md overflow-hidden">
                                        <Image src={`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/manga/${manga.id}/${manga.cover}`} alt={manga.title + "cover"} width={150} height={300} className="w-full h-full rounded-md group-hover:scale-105 transition-all  border-black/10 dark:border-white/10" />
                                    </AspectRatio>
                                    <p className="text-lg font-medium">
                                        {manga.title}
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