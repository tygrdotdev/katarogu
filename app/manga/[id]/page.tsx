import { AspectRatio } from "@/components/ui/aspect-ratio";
import pb from "@/lib/pocketbase";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import BackButton from "@/components/back";
import Manga from "@/types/manga";
import { sanitize } from "isomorphic-dompurify";
import { Badge } from "@/components/ui/badge";

export default async function MangaSingleton({
	params,
}: {
	params: { id: string };
}) {
	const manga = await pb
		.collection("manga")
		.getOne<Manga>(params.id, { expand: "authors,actors" })
		.catch((err) => console.error(err));

	if (!manga) {
		notFound();
	}

	const rawCharacters = await pb
		.collection("manga_characters")
		.getFullList({ filter: `manga ~ '${params.id}'`, expand: "character" })
		.catch((err) => {
			console.error(err);
			return undefined;
		});

	const characters = rawCharacters?.map((item: any) => {
		return {
			...item.expand.character,
			role: item.role,
		};
	});

	return (
		<>
			<main className="flex w-full flex-col items-start gap-6 pb-4">
				<div className="flex w-full flex-row items-center gap-2 md:justify-between">
					<div className="flex w-full flex-col gap-4">
						<BackButton />
						<div className="flex w-full flex-row gap-4">
							<div className="block h-full w-1/3 md:hidden">
								<AspectRatio
									ratio={2 / 3}
									className="h-full w-full overflow-hidden rounded-md"
								>
									<Image
										src={`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/manga/${manga.id}/${manga.cover}`}
										alt={manga.title + "cover"}
										priority
										width={200}
										height={400}
										className="h-full w-full rounded-md border border-black/10 dark:border-white/10"
									/>
								</AspectRatio>
							</div>
							<div className="flex w-2/3 flex-col justify-between gap-6">
								<div className="flex w-full flex-col gap-1">
									<h1 className="text-3xl font-bold md:text-3xl lg:text-4xl">
										{manga.title}
									</h1>
									<div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
										<p className="hidden xs:block">
											{manga.alternative_titles["japanese"] && (
												<span className="text-neutral-500 dark:text-neutral-400">
													({manga.alternative_titles["japanese"]})
												</span>
											)}
										</p>
										{typeof manga.genres !== "undefined" && (
											<div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
												<p className="hidden md:block">&bull;</p>
												<div className="flex flex-row items-center gap-2">
													{manga.genres.map((genre, i) => (
														<Badge key={i} variant="secondary">
															{genre}
														</Badge>
													))}
												</div>
											</div>
										)}
									</div>
								</div>
								<div className="flex w-full flex-row items-center gap-3 md:hidden">
									<Button variant="outline">Edit</Button>
									<Button className="flex items-center">
										Add to list <Plus size={16} />
									</Button>
								</div>
							</div>
						</div>
					</div>
					<div className="hidden flex-row items-center gap-3 md:flex">
						<Button variant="ghost">Edit</Button>
						<Button className="flex items-center">
							Add to list <Plus size={16} />
						</Button>
					</div>
				</div>
				<div className="flex h-full w-full flex-col items-start gap-8 md:flex-row">
					<div className="flex h-full w-full flex-col items-start gap-4 md:w-1/4 lg:w-1/5">
						<div className="hidden h-full w-full md:block">
							<AspectRatio
								ratio={2 / 3}
								className="h-full w-full overflow-hidden rounded-md"
							>
								<Image
									src={`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/manga/${manga.id}/${manga.cover}`}
									alt={manga.title + "cover"}
									priority
									width={200}
									height={400}
									className="h-full w-full rounded-md border border-black/10 dark:border-white/10"
								/>
							</AspectRatio>
						</div>
						{typeof manga.alternative_titles !== "undefined" && (
							<div className="flex w-full flex-col items-start gap-2">
								<h2 className="text-lg font-medium">Alternative Titles</h2>
								<hr className="w-full border-b" />
								<div className="list-inside list-disc">
									{Object.keys(manga.alternative_titles).map((key) => (
										<p className="flex flex-row gap-2" key={key}>
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												{key[0].toUpperCase() + key.slice(1, key.length)}:{" "}
											</span>
											{manga.alternative_titles[key]}
										</p>
									))}
								</div>
							</div>
						)}
						<div className="flex w-full flex-col items-start gap-2">
							<h2 className="text-lg font-medium">Information</h2>
							<hr className="w-full border-b" />
							<div className="flex flex-col items-start gap-2">
								<p className="flex flex-row gap-2">
									<span className="font-semibold text-neutral-500 dark:text-neutral-400">
										Status:{" "}
									</span>
									{manga.status[0].toUpperCase() +
										manga.status.slice(1, manga.status.length)}
								</p>
								<p className="flex flex-row gap-2">
									<span className="font-semibold text-neutral-500 dark:text-neutral-400">
										Volumes:{" "}
									</span>
									{manga.volumes === 0 ? "Unknown" : manga.volumes}
								</p>
								<p className="flex flex-row gap-2">
									<span className="font-semibold text-neutral-500 dark:text-neutral-400">
										Chapters:{" "}
									</span>
									{manga.chapters === 0 ? "Unknown" : manga.chapters}
								</p>
								<p className="flex flex-row gap-2">
									<span className="font-semibold text-neutral-500 dark:text-neutral-400">
										Started:{" "}
									</span>
									{new Date(manga.start_date).toLocaleDateString()}
								</p>
								{manga.end_date.length > 1 && (
									<p className="flex flex-row gap-2">
										<span className="font-semibold text-neutral-500 dark:text-neutral-400">
											Ended:{" "}
										</span>
										{manga.end_date.length < 1
											? "?"
											: new Date(manga.end_date).toLocaleDateString()}
									</p>
								)}
							</div>
						</div>
					</div>
					<div className="flex h-full w-full flex-1 grow flex-col items-center gap-6 md:w-3/4 lg:w-4/5">
						<div className="flex w-full flex-col items-start gap-2">
							<h2 className="text-lg font-medium">Synopsis</h2>
							<hr className="w-full border-b" />
							<div
								dangerouslySetInnerHTML={{
									__html: sanitize(manga.synopsis),
								}}
								className="text-neutral-500 dark:text-neutral-400"
							/>
						</div>
						{manga.background && (
							<div className="flex w-full flex-col items-start gap-2">
								<h2 className="text-lg font-medium">Background</h2>
								<hr className="w-full border-b" />
								<div
									dangerouslySetInnerHTML={{
										__html: sanitize(manga.background),
									}}
									className="text-neutral-500 dark:text-neutral-400"
								/>
							</div>
						)}
						<div className="flex w-full flex-col items-start gap-2">
							<h2 className="text-lg font-medium">Characters</h2>
							<hr className="w-full border-b" />
							{typeof characters === "undefined" ? (
								<div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
									<div className="flex flex-row items-center gap-2">
										<X
											size={24}
											className="text-neutral-500 dark:text-neutral-400"
										/>
										<p className="text-neutral-500 dark:text-neutral-400">
											Failed to fetch characters.
										</p>
									</div>
									<Button size="sm" variant="outline">
										Retry
									</Button>
								</div>
							) : (
								<>
									<div className="grid w-full grid-cols-2 gap-4 py-2 md:grid-cols-4 lg:grid-cols-6">
										{characters.map((character: any) => (
											<div
												className="flex h-full w-full flex-col items-start"
												key={character.id}
											>
												<Image
													src={`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/characters/${character.id}/${character.portrait}`}
													alt={character.name}
													width={800}
													height={900}
													className="h-full w-full rounded-md object-cover"
												/>
												<div className="relative h-full w-full">
													<div className="absolute bottom-0 left-0 right-0 rounded-b-md border-black/10 bg-black/10 p-2 text-white backdrop-blur-md dark:border-white/10">
														<h3 className="text-lg font-medium">
															{character.name}
														</h3>
														<p className="text-neutral-300">
															{character.role[0].toUpperCase() +
																character.role.slice(1, character.role.length)}
														</p>
													</div>
												</div>
											</div>
										))}
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
