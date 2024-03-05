"use client";

import { useAuth } from "@/components/auth/provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import pb from "@/lib/pocketbase";
import { MangaProgress } from "@/types/manga/progress";
import { User } from "@/types/user";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

export default function ProfileMangaList() {
	const { user } = useAuth();

	const [mangaList, setMangaList] = useState<MangaProgress[]>();

	const getMangaList = useCallback(async () => {
		if (user) {
			await pb
				.collection<User>("users")
				.getOne(user.id, {
					expand: "manga_list.entry",
				})
				.then((res) => {
					setMangaList(res.expand?.manga_list);
				});
		}
	}, [user]);

	useEffect(() => {
		if (user) {
			getMangaList();

			pb.collection("users").subscribe(user.id, (manga) => {
				getMangaList();
			});
		}
	}, [getMangaList, user]);

	return (
		<>
			{user && (
				<>
					<div className="grid h-full w-full grid-cols-1 gap-6 py-4 xs:grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
						{mangaList &&
							mangaList.map((manga: MangaProgress) => (
								<Link
									href={`/manga/${manga.expand?.entry.id}`}
									passHref
									key={manga.expand?.entry.id}
								>
									<div className="group flex h-fit w-full flex-row gap-2 rounded-md border-black/10 dark:border-white/10">
										<div className="h-full w-1/3 overflow-hidden rounded-md">
											<Image
												src={`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/manga/${manga.expand?.entry.id}/${manga.expand?.entry.cover}`}
												alt={manga.expand?.entry.title + " cover"}
												width={150}
												height={300}
												className="h-fit w-fit rounded-md border-black/10 transition-all  group-hover:scale-105 dark:border-white/10"
											/>
										</div>
										<p className="w-full text-xl font-medium">
											{manga.expand?.entry.title}
										</p>
									</div>
								</Link>
							))}
					</div>
				</>
			)}
		</>
	);
}
