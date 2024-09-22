import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { EyeOff, Lock } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import useSWR from "swr";
import { validateRequest } from "@/auth";

function Badges() {
	return <></>;
}

export default async function ProfileHeader({
	children,
}: {
	children?: React.ReactNode;
}) {
	// const { data: user } = useSWR("/api/auth/user", (...args) => fetch(...args).then((res) => res.json()));
	const { user } = await validateRequest();

	return (
		<>
			{user && (
				<div className="flex flex-col items-start pb-8 sm:pb-0">
					<div className="flex h-full w-full flex-col gap-3">
						<AspectRatio ratio={4 / 1}>
							<Image
								src={user.banner}
								priority
								width={1400}
								height={250}
								alt="banner"
								className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
							/>
						</AspectRatio>
					</div>
					<div className="flex w-full flex-row justify-between">
						<div className="flex h-20 min-h-20 w-full -translate-y-14 flex-col px-2 text-xl font-semibold sm:-translate-y-10 sm:flex-row sm:px-4 md:-translate-y-14 md:px-6">
							<Avatar className="mb-2 h-24 w-24 border-2 border-black/10 dark:border-white/10 sm:h-28 sm:w-28 md:h-32 md:w-32">
								<AvatarImage
									src={user.avatar}
									aria-label="User Avatar"
									alt="Avatar"
								/>
								<AvatarFallback>
									{(user.username ?? "A").slice(0, 1).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="flex w-full flex-row items-center justify-between sm:pl-4 sm:pt-20 md:pt-24">
								<span className="flex w-full flex-col font-semibold text-black dark:text-white">
									<span className="flex flex-row items-center gap-2">
										{/* {user.visibility === "private" && (
											<Tooltip delayDuration={500}>
												<TooltipTrigger>
													<Lock size={24} />
												</TooltipTrigger>
												<TooltipContent>Private</TooltipContent>
											</Tooltip>
										)}
										{user.visibility === "unlisted" && (
											<Tooltip delayDuration={500}>
												<TooltipTrigger>
													<EyeOff size={24} />
												</TooltipTrigger>
												<TooltipContent>Unlisted</TooltipContent>
											</Tooltip>
										)} */}
										<p className="w-full text-2xl font-bold sm:text-xl md:text-2xl">
											{user.name}
										</p>
										{/* <Tooltip delayDuration={0}>
												<TooltipTrigger>
														<span className="block w-2 h-2 rounded-full bg-neutral-500"></span>
												</TooltipTrigger>
												<TooltipContent>
														<p>Offline</p>
												</TooltipContent>
										</Tooltip> */}
									</span>
									<span className="md:text-md text-sm font-normal text-neutral-500 sm:text-sm">
										@{user.username}
									</span>
								</span>
								<div className="flex w-full flex-row items-center justify-end gap-2 sm:hidden">
									{children}
								</div>
								<div className="flex flex-row items-start">
									<Badges />
								</div>
							</div>
						</div>
						<div className="flex flex-row items-start sm:hidden">
							<Badges />
						</div>
						<div className="hidden w-full flex-row items-center justify-end gap-2 py-4 sm:flex">
							{children}
						</div>
					</div>
				</div>
			)}
		</>
	);
}