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
import { ArrowDown } from "lucide-react";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { toast } from "sonner";
import useSWR from "swr";
import { User } from "@/types/database/user";
import { useRouter } from "next/navigation";

export default function BannerRemove(props: ButtonProps) {
	const { data: user } = useSWR<User>("/api/auth/user", (url: string) => fetch(url).then((res) => res.json()));

	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const router = useRouter();

	async function removeBanner() {
		await fetch("/api/assets/banners/remove", {
			method: "DELETE",
		}).then(async (res) => {
			const json = await res.json();
			if (res.ok) {
				router.refresh();
				toast.success("Success!", {
					description: "Your banner has been removed. It may take a few minutes to update.",
				});
			} else {
				toast.error(json.message);
			}
		});
	}

	const onSubmit = () => {
		removeBanner();
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
						<DialogTitle>Remove Banner</DialogTitle>
						<DialogDescription>
							Are you sure you want to delete your banner?
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col items-center justify-between gap-4 px-6 pb-4">
						<AspectRatio ratio={4 / 1}>
							<img
								src={user?.banner ?? "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80"}
								width={1400}
								height={250}
								alt="banner"
								className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
							/>
						</AspectRatio>
						<ArrowDown className="mx-4 h-8 w-8 text-neutral-500" />
						<AspectRatio ratio={4 / 1}>
							<img
								src={
									"https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80"
								}
								width={1400}
								height={250}
								alt="banner"
								className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
							/>
						</AspectRatio>
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
					<DrawerTitle>Remove Banner</DrawerTitle>
					<DrawerDescription>
						Are you sure you want to delete your banner?
					</DrawerDescription>
				</DrawerHeader>
				<div className="flex flex-col items-center justify-center gap-4 p-6">
					<AspectRatio ratio={4 / 1}>
						<img
							src={user?.banner ?? "https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80"}
							width={1400}
							height={250}
							alt="banner"
							className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
						/>
					</AspectRatio>
					<ArrowDown className="mx-4 h-8 w-8 text-neutral-500" />
					<AspectRatio ratio={4 / 1}>
						<img
							src={
								"https://images.unsplash.com/photo-1636955816868-fcb881e57954?q=80"
							}
							width={1400}
							height={250}
							alt="banner"
							className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
						/>
					</AspectRatio>
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