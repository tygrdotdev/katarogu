import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Character from "@/types/character";
import { CharacterCollection } from "@/types/database/character";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateCharacter from "@/app/manga/new/character/creation";
import Spinner from "@/components/ui/spinner";

export default function CharacterSelection({ value, setValue, children }: { value: Character[], setValue: React.Dispatch<React.SetStateAction<Character[]>>, children: React.ReactNode }) {
	const [query, setQuery] = React.useState<string>("");
	const [loading, setLoading] = React.useState<boolean>(false);
	const [characters, setCharacters] = React.useState<CharacterCollection[]>([]);

	React.useEffect(() => {
		setLoading(true);
		const getCharacters = setTimeout(async () => {
			await fetch(`/api/characters/${query}`).then((res) => res.json()).then((data) => {
				setCharacters(data);
				setLoading(false);
			})
		}, 500);

		return () => clearTimeout(getCharacters);
	}, [query]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Select a character</DialogTitle>
					<DialogDescription>
						Search the database for a character to add to the entry, or create a new one.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-4 items-center">
					<Input placeholder="Search characters..." value={query} onChange={(e) => {
						setQuery(e.target.value);
					}} />
					{loading ? (
						<div className="flex flex-col gap-2 items-center justify-center w-full py-8">
							<Spinner />
						</div>
					) : (
						<>
								{characters.filter((character) => !value.includes(character)).length === 0 && (
									<div className="flex flex-col gap-3 items-center py-8 w-full">
										<p className="text-muted-foreground text-xl">No characters found.</p>
										<CreateCharacter>
											<Button className="w-fit">
												Create new character
											</Button>
										</CreateCharacter>
									</div>
								)}
								<div className="grid grid-cols-3 w-full">
									{characters.filter((character) => !value.includes(character)).map((character) => (
										<div
											className="flex h-full w-full flex-col items-center cursor-pointer"
											key={character._id}
											onClick={() => {
												setValue((prev) => [...prev, character]);
											}}
										>
											<Image
												src={character.cover}
												alt={character.english_name}
												width={800}
												height={900}
												className="h-full w-full rounded-md object-cover"
											/>
											<div className="relative w-full">
												<div className="absolute bottom-0 left-0 right-0 rounded-b-md border-black/10 bg-black/10 p-2 text-white backdrop-blur-md dark:border-white/10">
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
								</div>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}