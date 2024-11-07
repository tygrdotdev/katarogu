"use client";

import BackButton from "@/components/back";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Manga from "@/types/manga";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import GenreSelection from "@/app/manga/new/genre-selection";
import CharacterSelection from "@/app/manga/new/character/selection";
import Character from "@/types/character";
import CoverUpload from "@/components/manga/cover-upload";
import DatePicker from "@/components/date-picker";
import PeopleSelection from "@/app/manga/new/people/selection";
import Person from "@/types/person";

export default function NewMangaPage() {
	const [englishTitle, setEngTitle] = useState("");
	const [japaneseTitle, setJapTitle] = useState("");
	const [cover, setCover] = useState<Manga["cover"]>("");
	const [volumes, setVolumes] = useState<Manga["volumes"]>(0);
	const [chapters, setChapters] = useState<Manga["chapters"]>(0);
	const [synopsis, setSynopsis] = useState<Manga["synopsis"]>("");
	const [background, setBackground] = useState<Manga["background"]>("");
	const [start_date, setStartDate] = useState<Date>(new Date(Date.now()));
	const [end_date, setEndDate] = useState<Date>(new Date(Date.now()));
	const [nsfw, setNsfw] = useState<Manga["nsfw"]>("sfw");
	const [people, setPeople] = useState<Person[]>([]);
	const [genres, setGenres] = useState<Manga["genres"]>([]);
	// const [media, setMedia] = useState<Manga["media"]>();
	const [status, setStatus] = useState<Manga["status"]>("unpublished");
	const [characters, setCharacters] = useState<Character[]>([]);

	const characterSelection = useRef<HTMLButtonElement>(null);
	const peopleSelection = useRef(null);

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
				<BackButton confirm />
				<div className="flex h-full w-full flex-col items-start gap-8 md:flex-row">
					<div className="flex h-full w-full flex-col items-start md:gap-4 md:w-1/4 lg:w-1/5">
						<AspectRatio
							ratio={2 / 3}
							className="h-full w-full overflow-hidden rounded-md"
						>
							<Image
								src={cover ? cover : `https://placehold.co/200x400.png`}
								alt={englishTitle ?? "Placeholder"}
								priority
								width={200}
								height={400}
								className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
							/>
						</AspectRatio>
						<div className="flex w-full flex-row items-center gap-2">
							<CoverUpload setValue={setCover} className="w-full">
								Upload
							</CoverUpload>
							<Button
								variant="outline"
								className="w-full"
								onClick={() => setCover("")}
							>
								Remove
							</Button>
						</div>
						<div className="flex w-full flex-col items-start gap-4 pt-4">
							<div className="flex flex-col gap-2 w-full">
								<h2 className="text-xl font-semibold">Information</h2>
								<hr className="w-full border-neutral-200 dark:border-neutral-700" />
							</div>
							<div className="flex flex-col items-start gap-3 w-full">
								<div className="flex flex-col gap-1 w-full">
									<span className="font-semibold text-neutral-500 dark:text-neutral-400">
										Status:{" "}
									</span>
									<Select
										name="status"
										value={status}
										onValueChange={(e: Manga["status"]) => setStatus(e)}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select a status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="unpublished">Unpublished</SelectItem>
											<SelectItem value="publishing">Publishing</SelectItem>
											<SelectItem value="finished">Finished</SelectItem>
										</SelectContent>
									</Select>
								</div>
								{status !== "unpublished" && (
									<>
										<div className="flex flex-col gap-1 w-full">
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												Volumes:{" "}
											</span>
											<Input
												type="number"
												value={volumes}
												onChange={(e) => setVolumes(parseInt(e.target.value))}
												min={0}
												className="w-full"
											/>
										</div>
										<div className="flex flex-col gap-1 w-full">
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												Chapters:{" "}
											</span>
											<Input
												type="number"
												value={chapters}
												onChange={(e) => setChapters(parseInt(e.target.value))}
												min={0}
											/>
										</div>
										<div className="flex flex-col gap-1 w-full">
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												Genres:{" "}
											</span>
											<GenreSelection value={genres} setValue={setGenres} />
										</div>
										<div className="flex flex-col gap-1 w-full">
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												NSFW:{" "}
											</span>
											<Select
												name="nsfw"
												value={nsfw}
												onValueChange={(e: Manga["nsfw"]) => setNsfw(e)}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="sfw">Safe for Work</SelectItem>
													<SelectItem value="suggestive">Suggestive</SelectItem>
													<SelectItem value="nsfw">Not Safe for Work</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="flex flex-col gap-1 w-full">
											<span className="font-semibold text-neutral-500 dark:text-neutral-400">
												Started:{" "}
											</span>
											<DatePicker value={start_date} setValue={setStartDate} />
										</div>
									</>
								)}
								{status === "finished" && (
									<div className="flex flex-col w-full gap-1">
										<span className="font-semibold text-neutral-500 dark:text-neutral-400">
											Ended:{" "}
										</span>
										<DatePicker value={end_date} setValue={setEndDate} />
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="md:w-3/4 lg:w-4/5 w-full grow flex-1 h-full flex flex-col items-center gap-6">
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-lg font-medium">
								English Title
							</h2>
							<Input
								placeholder="Enter the English title of the manga"
								value={englishTitle}
								onChange={(e) => setEngTitle(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-lg font-medium">
								Japanese Title
							</h2>
							<Input
								placeholder="Enter the Japanese title of the manga"
								value={japaneseTitle}
								onChange={(e) => setJapTitle(e.target.value)}
							/>
						</div>
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-lg font-medium">
								Synopsis
							</h2>
							<Textarea value={synopsis} onChange={(e) => setSynopsis(e.target.value)} className="min-h-32" placeholder="A brief summary or general survey of the manga entry. If you take the Synopsis from a different manga site, please make sure to add them as credit." />
						</div>
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-lg font-medium">
								Background
							</h2>
							<Textarea value={background} onChange={(e) => setBackground(e.target.value)} className="min-h-32" placeholder="Encyclopedic information on the series, written in full sentences, which expands upon the database information. This includes the history of the work, awards it may have won, details on how this work may have impacted the industry or individuals' careers, North American licensing information, media adaptations outside of anime/manga, etc." />
						</div>
						<div className="flex flex-col gap-2 items-start w-full h-full">
							<div className="flex flex-row w-full gap-2 items-center justify-between">
								<h2 className="text-lg font-medium">
									Characters
								</h2>
								<CharacterSelection value={characters} setValue={setCharacters} ref={characterSelection}>
									<Button size="sm">
										<Plus className="h-4 w-4" /> Add Character
									</Button>
								</CharacterSelection>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-2 w-full h-full">
							{characters.length !== 0 ? (
									<>
										{characters.map((character: Character) => (
											<div className="flex flex-col items-start w-full h-full cursor-pointer" onClick={() => {
												setCharacters((prev) => prev.filter((c) => c !== character));
											}}>
												{character.cover ? (
													<Image
														src={character.cover}
														alt={character.english_name}
														width={800}
														height={900}
														className="h-full w-full rounded-md object-cover"
													/>
												) : (
													<div className="w-full min-h-full px-2 bg-neutral-200 dark:bg-neutral-800 flex flex-col items-center py-24 text-center rounded-md">
														<h1 className="text-xl font-semibold">No Cover Found</h1>
													</div>
												)}
												<div className="relative w-full h-full">
													<div className="absolute left-0 bottom-0 right-0 bg-black/10 backdrop-blur-md border-black/10 dark:border-white/10 p-2 text-white rounded-b-md">
														<h3 className="text-lg font-medium">
															{character.english_name}
														</h3>
														<p className="text-sm text-neutral-500 dark:text-neutral-400">
															{character.japanese_name}
														</p>
													</div>
												</div>
											</div>
										))}
								</>
								) : (
										<button className="w-full min-h-full px-3 border-2 border-black/10 dark:border-white/10 border-dashed flex flex-col items-center py-24 text-center rounded-md" onClick={() => characterSelection.current?.click()}>
											<h1 className="text-xl font-semibold text-neutral-500 dark:text-neutral-400">Add Character</h1>
										</button>
							)}
							</div>
						</div>
						<div className="flex flex-col gap-2 items-start w-full">
							<div className="flex flex-row w-full gap-2 items-center justify-between">
								<h2 className="text-lg font-medium">
									People
								</h2>
								<PeopleSelection value={people} setValue={setPeople}>
									<Button size="sm">
										<Plus className="h-4 w-4" /> Add Person
									</Button>
								</PeopleSelection>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 py-2 w-full h-full">
							{people.length !== 0 ? (
									<>
										{people.map((person: Person) => (
											<div className="flex flex-col items-start w-full h-full cursor-pointer" onClick={() => {
												setPeople((prev) => prev.filter((p) => p !== person));
											}}>
												{person.cover ? (
													<Image
														src={person.cover}
														alt={person.name}
														width={800}
														height={900}
														className="h-full w-full rounded-md object-cover"
													/>
												) : (
													<div className="w-full min-h-full px-2 bg-neutral-200 dark:bg-neutral-800 flex flex-col items-center py-24 text-center rounded-md">
														<h1 className="text-xl font-semibold">No Cover Found</h1>
													</div>
												)}
												<div className="relative w-full h-full">
													<div className="absolute left-0 bottom-0 right-0 bg-black/10 backdrop-blur-md border-black/10 dark:border-white/10 p-2 text-white rounded-b-md">
														<h3 className="text-lg font-medium">
															{person.name}
														</h3>
														<p className="text-sm text-neutral-500 dark:text-neutral-400">
															{person.given_name}
														</p>
													</div>
												</div>
											</div>
										))}
								</>
							) : (
										<PeopleSelection value={people} setValue={setPeople}>
											<button className="w-full min-h-full px-3 border-2 border-black/10 dark:border-white/10 border-dashed flex flex-col items-center py-24 text-center rounded-md">
												<h1 className="text-xl font-semibold text-neutral-500 dark:text-neutral-400">Add Person</h1>
											</button>
										</PeopleSelection>
							)}
							</div>
						</div>
					</div>
				</div>
			</main >
		</>
	);
}