import { AspectRatio } from "@/components/ui/aspect-ratio";
import pb from "@/lib/pocketbase";
import Image from "next/image";
import Link from "next/link";
import Manga from "@/types/manga";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AllMangaPage() {
	// TODO: Implement pagination
	const manga = await pb.collection("manga").getFullList<Manga>();

	return (
		<>
			<main className="flex w-full flex-col items-start gap-6 pb-4">
				<div className="items-between flex w-full flex-row items-center gap-4">
					<div className="flex w-full flex-col">
						<h1 className="text-4xl font-bold">Manga</h1>
						<p className="text-neutral-500 dark:text-neutral-400">
							A full list of all manga on Katarogu.
						</p>
					</div>
					<Link href="/manga/new" passHref>
						<Button className="flex flex-row items-center gap-2">
							<Plus className="h-4 w-4" /> Add Entry
						</Button>
					</Link>
				</div>
				<div className="grid w-full grid-cols-3 gap-6 md:grid-cols-4 lg:grid-cols-6">
					{manga.map((manga: any) => (
						<Link href={`/manga/${manga.id}`} passHref key={manga.id}>
							<div className="group flex flex-col gap-2 rounded-md border-black/10 dark:border-white/10">
								<AspectRatio
									ratio={2 / 3}
									className="h-full w-full overflow-hidden rounded-md"
								>
									<Image
										src={`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/manga/${manga.id}/${manga.cover}`}
										alt={manga.title + "cover"}
										width={150}
										height={300}
										className="h-full w-full rounded-md border-black/10 transition-all  group-hover:scale-105 dark:border-white/10"
									/>
								</AspectRatio>
								<p className="text-lg font-medium">{manga.title}</p>
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
	);
}
