"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio";
import pb from "@/lib/pocketbase";
import Image from "next/image";
import Link from "next/link";
import { RawManga } from "@/types/manga";

export default async function AllMangaPage() {
    // TODO: Implement pagination
    const manga = await pb.collection("manga").getFullList<RawManga>();

    return (
        <>
            <main className="flex flex-col gap-6 items-start w-full pb-4">
                <div>
                    <h1 className="text-4xl font-bold">Manga</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">
                        A full list of all manga on Katarogu.
                    </p>
                </div>
                <div className="grid grid-cols-6 gap-6 w-full">
                    {manga.map((manga: any) => (
                        <Link href={`/manga/${manga.id}`} passHref key={manga.id}>
                            <div className="border-black/10 dark:border-white/10 rounded-md gap-2 flex flex-col group" >
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
                {/* TODO: Implement pagination */}
                {/* <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination> */}
            </main>
        </>
    )
}