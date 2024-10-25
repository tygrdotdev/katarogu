"use client"

/* eslint-disable @next/next/no-img-element */
// Disabled eslint for img element because images are loaded from local storage, not from the web.
import * as React from "react";

import { useMediaQuery } from "usehooks-ts";
import { Button, ButtonProps } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ArrowRight } from "lucide-react";
import useSWR from "swr";
import { User } from "@/auth/sessions";
import { toast } from "sonner";

export default function AvatarRemove(props: ButtonProps) {
	const { data: user } = useSWR<User>("/api/auth/user", (url: string) => fetch(url).then((res) => res.json()));
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	async function removeAvatar() {
		await fetch("/api/assets/avatars/remove", {
			method: "DELETE",
		}).then(async (res) => {
			if (res.ok) {
				toast.success("Success!", {
					description: "Your avatar has been removed. It may take a few minutes to update.",
				});
			} else {
				const json = await res.json();
				toast.error("Something went wrong!", {
					description: json.message,
				});
			}
		})
	}

	const onSubmit = () => {
		removeAvatar();
		setOpen(false);
	};

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button {...props} />
				</DialogTrigger>
				<DialogContent className="p-0 sm:max-w-[425px]">
					<DialogHeader className="p-6">
						<DialogTitle>Remove Avatar</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete your avatar?
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-row items-center justify-between px-6 pb-4">
						<img
							src={user?.avatar}
							className="h-32 w-32 rounded-full border"
							alt="Current Avatar"
						/>
						<ArrowRight className="mx-4 h-8 w-8 text-neutral-500" />
						<img
							src={`https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${user?.username}&radius=50`}
							className="h-32 w-32 rounded-full border"
							alt="New Avatar"
						/>
					</div>
					<div className="flex flex-row items-center justify-between gap-4 border-t bg-neutral-50/50 dark:bg-neutral-900/50 p-4">
						<span className="text-sm text-neutral-600 dark:text-neutral-400">
							This action is not reversible.
						</span>
						<Button variant="destructive" onClick={onSubmit}>
							Confirm
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button {...props} />
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Remove Avatar</DrawerTitle>
					<DrawerDescription>
						Are you sure you want to delete your avatar?
					</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-row items-center justify-center p-6">
					<img
						src={user?.avatar}
						className="h-32 w-32 rounded-full"
						alt="Current Avatar"
					/>
					<ArrowRight className="mx-4 h-8 w-8 text-neutral-500" />
					<img
						src={`https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${user?.username}&radius=50`}
						className="h-32 w-32 rounded-full"
						alt="New Avatar"
					/>
				</div>
				<div className="flex w-full flex-row justify-between gap-2 border-t p-4">
					<Button variant="outline" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button onClick={onSubmit}>Confirm</Button>
				</div>
			</DrawerContent>
		</Drawer>
	);
}