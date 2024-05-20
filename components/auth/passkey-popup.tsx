import * as React from "react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { useAuth } from "./provider";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function PasskeyPrompt({
	open,
	setOpen,
	...props
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
}) {
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [username, setUsername] = React.useState("");
	const { signInWithPasskey } = useAuth();

	if (isDesktop) {
		return (
			<>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogContent className="gap-0 p-0 sm:max-w-[425px]">
						<DialogHeader className="p-6">
							<DialogTitle>Sign in with Passkey</DialogTitle>
							<DialogDescription>
								Enter your username below to continue.
							</DialogDescription>
						</DialogHeader>
						<div className="pb-6 px-6 flex flex-col gap-2">
							<Label htmlFor="username">Username</Label>
							<Input
								type="text"
								placeholder="tygrdev"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
							/>
						</div>
						<div className="flex flex-row items-center justify-between gap-4 border-t bg-neutral-900/50 p-4">
							<div className="flex flex-row gap-4 justify-between items-center w-full">
								<Button variant="outline">Cancel</Button>
								<Button
									onClick={async () => {
										await signInWithPasskey(username);
									}}
								>
									Submit
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</>
		);
	}

	return (
		<>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Sign in with Passkey</DrawerTitle>
						<DrawerDescription>
							Enter your username below to continue.
						</DrawerDescription>
					</DrawerHeader>
					<div className="pb-6 px-6 flex flex-col gap-2">
						<Label htmlFor="username">Username</Label>
						<Input
							type="text"
							placeholder="tygrdev"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<div className="flex flex-row items-center justify-between gap-4 border-t bg-neutral-900/50 p-4">
						<div className="flex flex-row gap-4 justify-between items-center w-full">
							<Button variant="outline">Cancel</Button>
							<Button
								onClick={async () => {
									await signInWithPasskey(username);
								}}
							>
								Submit
							</Button>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</>
	);
}
