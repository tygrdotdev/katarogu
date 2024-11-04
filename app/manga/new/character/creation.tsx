import CoverUpload from "@/components/manga/cover-upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Character from "@/types/character";
import Person from "@/types/person";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

export default function CreateCharacter({ children }: { children: React.ReactNode }) {
	const [englishName, setEnglishName] = React.useState<string>("");
	const [japaneseName, setJapaneseName] = React.useState<string>("");
	const [alternateNames, setAlternateNames] = React.useState<string[]>([]);
	const [cover, setCover] = React.useState<string>("");
	const [biography, setBiography] = React.useState<string>("");
	const [media, setMedia] = React.useState<string[]>([]);

	const submit = async () => {
		const res = await fetch("/api/characters/create", {
			method: "POST",
			body: JSON.stringify({
				english_name: englishName,
				japanese_name: japaneseName,
				alternate_names: alternateNames,
				cover,
				biography,
				media
			} as Character)
		});

		const data = await res.json();

		if (res.ok) {
			toast.success("Success!", {
				description: data.message ?? "Character created successfully"
			});
		} else {
			toast.error("Failed to create character", {
				description: data.message
			});
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="max-w-2xl w-full p-0">
				<DialogHeader className="hidden">
					<DialogTitle>Create a new character</DialogTitle>
					<DialogDescription>
						Fill out the form below to create a new character.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-row gap-6 items-start w-full px-6 pt-6">
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
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-sm font-medium">
								Biography
							</h2>
							<Textarea placeholder="A quick overview of the characters story and information like age, birthday, etc" value={biography} onChange={(e) => setBiography(e.target.value)} />
						</div>
					</div>
				</div>
				<div className="border-t border-black/10 dark:border-white/10">
					<div className="p-4 flex flex-row w-full items-center gap-4">
						<DialogClose asChild>
							<Button variant="outline" className="w-full" >
								Cancel
							</Button>
						</DialogClose>
						<Button className="w-full" onClick={async () => {
							await submit();
						}}>
							Create
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}