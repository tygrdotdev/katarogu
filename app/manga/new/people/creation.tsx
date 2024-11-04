import { generateIdFromEntropySize } from "@/auth/crypto";
import CoverUpload from "@/components/manga/cover-upload";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import Person from "@/types/person";
import { Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

export default function CreatePerson({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = React.useState<boolean>(false);
	const [name, setName] = React.useState<Person["name"]>("");
	const [givenName, setGivenName] = React.useState<Person["given_name"]>("");
	const [familyName, setFamilyName] = React.useState<Person["family_name"]>("");
	const [alternateNames, setAlternateNames] = React.useState<Person["alternate_names"]>([]);
	const [biography, setBiography] = React.useState<Person["biography"]>("");
	const [cover, setCover] = React.useState<Person["cover"]>("");
	const [loading, setLoading] = React.useState<boolean>(false);

	const submit = async () => {
		const id = generateIdFromEntropySize(10);

		const res = await fetch("/api/people/create", {
			method: "POST",
			body: JSON.stringify({
				id,
				name,
				given_name: givenName,
				family_name: familyName,
				alternate_names: alternateNames,
				biography,
				cover,
			})
		});

		const data = await res.json();

		if (!res.ok) {
			toast.error("Failed to create person", {
				description: data.message
			});
			return;
		}

		const buffer = Buffer.from(
			cover.replace(/^data:image\/\w+;base64,/, ""),
			"base64"
		);

		const formData = new FormData();

		formData.append("file", new File([buffer], `${id}.png`, { type: "image/png" }));
		formData.append("id", id);

		const coverRes = await fetch(`/api/assets/people/upload`, {
			method: "POST",
			body: formData
		});

		if (!coverRes.ok) {
			toast.error("Failed to upload cover", {
				description: data.message
			});
			return;
		}

		toast.success("Person created successfully");

		setLoading(false);
		clear();
		setOpen(false);
	}

	const clear = () => {
		setName("");
		setGivenName("");
		setFamilyName("");
		setBiography("");
		setCover("");
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
			<DialogContent className="max-w-2xl w-full p-0" onInteractOutside={(e) => {
				if (loading) e.preventDefault();
			}}>
				<DialogHeader className="hidden">
					<DialogTitle>Create a new Person</DialogTitle>
					<DialogDescription>
						Fill out the form below to create a new Person.
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
									alt={name ?? "Placeholder"}
									priority
									width={200}
									height={400}
									className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
								/>
							</AspectRatio>
							<div className="flex w-full flex-row items-center gap-2">
								<CoverUpload setValue={setCover} className="w-full" disabled={loading}>
									Upload
								</CoverUpload>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => setCover("")}
									disabled={loading}
								>
									<Trash className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>
					<div className="w-2/3 flex flex-col items-start gap-4">
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-sm font-medium">
								Name
							</h2>
							<Input placeholder="Ooima, Yoshitoki" disabled={loading} value={name} onChange={(e) => setName(e.target.value)} />
						</div>
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-sm font-medium">
								Given Name
							</h2>
							<Input placeholder="良時" disabled={loading} value={givenName} onChange={(e) => setGivenName(e.target.value)} />
						</div>
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-sm font-medium">
								Family Name
							</h2>
							<Input placeholder="大今" disabled={loading} value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
						</div>
						<div className="flex flex-col gap-2 items-start w-full">
							<h2 className="text-sm font-medium">
								Biography
							</h2>
							<Textarea disabled={loading} placeholder="A quick overview of the persons story and information like age, birthday, etc" value={biography} onChange={(e) => setBiography(e.target.value)} />
						</div>
					</div>
				</div>
				<div className="border-t border-black/10 dark:border-white/10">
					<div className="p-4 flex flex-row w-full items-center gap-4">
						<DialogClose asChild>
							<Button variant="outline" className="w-full" disabled={loading}>
								Cancel
							</Button>
						</DialogClose>
						<Button className="w-full" disabled={loading} onClick={async () => {
							setLoading(true);
							await submit();
						}}>
							{loading ? <Spinner size={16} /> : "Create"}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}