import CoverUpload from "@/components/manga/cover-upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function CreateCharacter({ children }: { children: React.ReactNode }) {
	const [englishName, setEnglishName] = React.useState<string>("");
	const [japaneseName, setJapaneseName] = React.useState<string>("");
	const [alternateNames, setAlternateNames] = React.useState<string[]>([]);
	const [cover, setCover] = React.useState<string>("");
	const [animeRelations, setAnimeRelations] = React.useState<{ role: "main" | "supporting" | "background", id: string }[]>([]);
	const [mangaRelations, setMangaRelations] = React.useState<{ role: "main" | "supporting" | "background", id: string }[]>([]);
	const [biography, setBiography] = React.useState<string>("");
	const [media, setMedia] = React.useState<string[]>([]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="w-1/2">
				<DialogHeader className="hidden">
					<DialogTitle>Create a new character</DialogTitle>
					<DialogDescription>
						Fill out the form below to create a new character.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-row gap-4 items-start w-full">
					<div className="w-1/3">
						<div className="w-full flex flex-col gap-3">
							<AspectRatio
								ratio={2 / 3}
								className="h-full w-full overflow-hidden rounded-md"
							>
								<Image
									src={cover ? cover : `https://placehold.co/200x400.png`}
									alt={englishName ?? "Placeholder"}
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
									<Trash className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
					<div className="w-2/3 flex flex-col items-start gap-4">
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-sm font-medium">
								English Name
							</h2>
							<Input placeholder="English Name" value={englishName} onChange={(e) => setEnglishName(e.target.value)} />
						</div>
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-sm font-medium">
								Japanese Name
							</h2>
							<Input placeholder="Japanese Name" value={japaneseName} onChange={(e) => setJapaneseName(e.target.value)} />
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}