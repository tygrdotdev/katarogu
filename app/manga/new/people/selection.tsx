import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import CreateCharacter from "@/app/manga/new/character/creation";
import Spinner from "@/components/ui/spinner";
import Person from "@/types/person";
import PersonCollection from "@/types/database/person";
import CreatePerson from "@/app/manga/new/people/creation";

export default function PeopleSelection({ value, setValue, children, ref }: { value: Person[], setValue: React.Dispatch<React.SetStateAction<Person[]>>, children: React.ReactNode, ref?: React.RefObject<HTMLButtonElement> }) {
	const [query, setQuery] = React.useState<string>("");
	const [loading, setLoading] = React.useState<boolean>(false);
	const [people, setPeople] = React.useState<PersonCollection[]>([]);

	React.useEffect(() => {
		setLoading(true);
		const getCharacters = setTimeout(async () => {
			await fetch(`/api/people/${query}`).then((res) => res.json()).then((data) => {
				setPeople(data);
				setLoading(false);
			})
		}, 500);

		return () => clearTimeout(getCharacters);
	}, [query]);

	return (
		<Dialog>
			<DialogTrigger asChild ref={ref}>
				{children}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Select a person</DialogTitle>
					<DialogDescription>
						Search the database for a person to add to the entry, or create a new one.
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
							{people.filter((person) => !value.includes(person)).length === 0 && (
								<div className="flex flex-col gap-3 items-center py-8 w-full">
									<p className="text-muted-foreground text-xl">No people found.</p>
									<CreatePerson>
										<Button className="w-fit">
											Create new person
										</Button>
									</CreatePerson>
								</div>
							)}
								<div className="grid grid-cols-3 w-full gap-3">
								{people.filter((person) => !value.includes(person)).map((person) => (
									<div
										className="flex h-full w-full flex-col items-center cursor-pointer"
										key={person._id}
										onClick={() => {
											setValue((prev) => [...prev, person]);
										}}
									>
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
										<div className="relative w-full">
											<div className="absolute bottom-0 left-0 right-0 rounded-b-md border-black/10 bg-black/10 p-2 text-white backdrop-blur-md dark:border-white/10">
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
							</div>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}