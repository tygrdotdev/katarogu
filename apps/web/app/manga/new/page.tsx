"use client";

import BackButton from "@/components/back";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import Manga from "@/types/manga";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";
import MangaCoverUpload from "@/components/manga/cover-upload";

export default function NewMangaPage() {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [title, setTitle] = useState("");
	const [alternativeTitles, setAlternativeTitles] =
		useState<Manga["alternative_titles"]>();
	const [cover, setCover] = useState<Manga["cover"]>();
	const [volumes, setVolumes] = useState<Manga["volumes"]>();
	const [chapters, setChapters] = useState<Manga["chapters"]>();
	const [synopsis, setSynopsis] = useState<Manga["synopsis"]>();
	const [background, setBackground] = useState<Manga["background"]>();
	const [start_date, setStartDate] = useState<Date>();
	const [end_date, setEndDate] = useState<Date>();
	const [nsfw, setNsfw] = useState<Manga["nsfw"]>();
	const [authors, setAuthors] = useState<Manga["authors"]>();
	const [genres, setGenres] = useState<Manga["genres"]>();
	// const [media, setMedia] = useState<Manga["media"]>();
	const [status, setStatus] = useState<Manga["status"]>("unpublished");

	function DatePicker({ value, setValue }: any) {
		return (
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={"outline"}
						className={cn(
							"w-[240px] justify-start text-left font-normal",
							!value && "text-muted-foreground"
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{value ? format(value, "PPP") : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className=" w-auto p-0">
					<Calendar
						mode="single"
						captionLayout="dropdown-buttons"
						selected={value}
						onSelect={setValue}
					/>
				</PopoverContent>
			</Popover>
		);
	}

	function MangaCoverRemove() {
		return <></>;
	}

	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			const message =
				"Are you sure you want to leave? Your changes will be lost.";
			e.returnValue = message; // for older browsers
			return message; // for modern browsers
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return (
		<>
			<main className="flex w-full flex-col items-start gap-6 pb-4">
				<div className="flex w-full flex-row items-center gap-2 md:justify-between">
					<div className="flex w-full flex-col gap-4">
						<BackButton confirm />
						<div className="flex w-full flex-row gap-4">
							{!isDesktop && (
								<div className="hidden w-1/3 flex-col gap-4 xs:flex">
									<AspectRatio
										ratio={2 / 3}
										className="h-full w-full overflow-hidden rounded-md"
									>
										<Image
											src={cover ? cover : `https://placehold.co/200x400.png`}
											alt={title ?? "Placeholder"}
											priority
											width={200}
											height={400}
											className="h-full w-full rounded-md border border-black/10 dark:border-white/10"
										/>
									</AspectRatio>
									<div className="flex flex-row items-center gap-3">
										<MangaCoverUpload setValue={setCover} className="w-full">
											Upload
										</MangaCoverUpload>
										<Button
											variant="outline"
											size="icon"
											className="px-2"
											onClick={() => setCover("")}
										>
											<Trash className="h-4 w-4" />
										</Button>
									</div>
								</div>
							)}
							<div className="flex w-2/3 flex-col justify-between gap-6">
								<div className="flex w-full flex-col gap-1">
									<input
										type="text"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
										placeholder="Manga Title"
										className="w-full rounded-md border border-black/10 bg-transparent p-2 text-3xl font-bold dark:border-white/10"
									/>
									<h1 className="text-3xl font-bold md:text-3xl lg:text-4xl"></h1>
									<div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
										{typeof genres !== "undefined" && (
											<div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
												<p className="hidden md:block">&bull;</p>
												<div className="flex flex-row items-center gap-2">
													{genres.map((genre, i) => (
														<Badge key={i} variant="secondary">
															{genre}
														</Badge>
													))}
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex h-full w-full flex-col items-start gap-8 md:flex-row">
					<div className="flex h-full w-full flex-col items-start gap-4 md:w-1/4 lg:w-1/5">
						{isDesktop && (
							<>
								<AspectRatio
									ratio={2 / 3}
									className="h-full w-full overflow-hidden rounded-md"
								>
									<Image
										src={cover ? cover : `https://placehold.co/200x400.png`}
										alt={title ?? "Placeholder"}
										priority
										width={200}
										height={400}
										className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
									/>
								</AspectRatio>
								<div className="flex w-full flex-row items-center gap-2">
									<MangaCoverUpload setValue={setCover} className="w-full">
										Upload
									</MangaCoverUpload>
									<Button
										variant="outline"
										className="w-full"
										onClick={() => setCover("")}
									>
										Remove
									</Button>
								</div>
							</>
						)}
						{typeof alternativeTitles !== "undefined" && (
							<div className="flex w-full flex-col items-start gap-2">
								<h2 className="text-lg font-medium">Alternative Titles</h2>
								<hr className="w-full border-b" />
								<div className="list-inside list-disc">
									{Object.keys(alternativeTitles).map((key) => (
										<p className="flex flex-row gap-2" key={key}>
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												{key[0].toUpperCase() + key.slice(1, key.length)}:{" "}
											</span>
											{alternativeTitles[key]}
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
									<Select
										name="status"
										value={status}
										onValueChange={(e: Manga["status"]) => setStatus(e)}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="unpublished">Unpublished</SelectItem>
											<SelectItem value="publishing">Publishing</SelectItem>
											<SelectItem value="finished">Finished</SelectItem>
										</SelectContent>
									</Select>
								</p>
								{status !== "unpublished" && (
									<>
										<p className="flex flex-row gap-2">
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												Volumes:{" "}
											</span>
											<Input
												type="number"
												value={volumes}
												onChange={(e) => setVolumes(parseInt(e.target.value))}
											/>
										</p>
										<p className="flex flex-row gap-2">
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												Chapters:{" "}
											</span>
											<Input
												type="number"
												value={chapters}
												onChange={(e) => setChapters(parseInt(e.target.value))}
											/>
										</p>
										<p className="flex flex-row gap-2">
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												Started:{" "}
											</span>
											<DatePicker value={start_date} setValue={setStartDate} />
										</p>
									</>
								)}
								{status === "finished" && (
									<p className="flex flex-row gap-2">
										<span className="font-semibold text-neutral-500 dark:text-neutral-400">
											Ended:{" "}
										</span>
										<DatePicker value={end_date} setValue={setEndDate} />
									</p>
								)}
							</div>
						</div>
					</div>
					{/* <div className="md:w-3/4 lg:w-4/5 w-full grow flex-1 h-full flex flex-col items-center gap-6">
                        <div className="flex flex-col gap-2 items-start w-full">
                            <h2 className="text-lg font-medium">
                                Synopsis
                            </h2>
                            <hr className="border-b w-full" />
                        </div>
                        {background && (
                            <div className="flex flex-col gap-2 items-start w-full">
                                <h2 className="text-lg font-medium">
                                    Background
                                </h2>
                                <hr className="border-b w-full" />
                            </div>
                        )}
                        <div className="flex flex-col gap-2 items-start w-full">
                            <h2 className="text-lg font-medium">
                                Characters
                            </h2>
                            <hr className="border-b w-full" />
                            {typeof characters === "undefined" ? (
                                <div className="flex flex-col w-full h-full gap-3 justify-center items-center p-4">
                                    <div className="flex flex-row gap-2 items-center">
                                        <X size={24} className="text-neutral-500 dark:text-neutral-400" />
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
                                    <div className="grid grid-cols-2 md:grid-cols-4 w-full lg:grid-cols-6 gap-4 py-2">
                                        {characters.map((character: any) => (
                                            <div className="flex flex-col items-start w-full h-full">
                                                <Image src={`${process.env.NEXT_PUBLIC_AUTH_URL}/api/files/characters/${character.id}/${character.portrait}`} alt={character.name} width={800} height={900} className="w-full h-full object-cover rounded-md" />
                                                <div className="relative w-full h-full">
                                                    <div className="absolute left-0 bottom-0 right-0 bg-black/10 backdrop-blur-md border-black/10 dark:border-white/10 p-2 text-white rounded-b-md">
                                                        <h3 className="text-lg font-medium">
                                                            {character.name}
                                                        </h3>
                                                        <p className="text-neutral-300">
                                                            {character.role[0].toUpperCase() + character.role.slice(1, character.role.length)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div> */}
				</div>
			</main>
		</>
	);
}
