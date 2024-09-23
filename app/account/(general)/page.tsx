import AccountCard from "@/app/account/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

import AvatarUpload from "@/app/account/(general)/avatar-upload";
import BannerUpload from "@/app/account/(general)/banner-upload";
import { validateRequest } from "@/auth";

export default async function AccountPage() {
	const { user } = await validateRequest();
	return (
		<>
			{user && (
				<>
					<div className="flex flex-col gap-4 pb-4 sm:gap-8">
						<div className="flex w-full flex-col rounded-md border">
							<div className="flex flex-row justify-between gap-4 border-b p-4 sm:flex-col sm:p-6">
								<div>
									<h1 className="text-xl font-bold">Avatar</h1>
									<p className="text-sm">
										Your avatar can be viewed publicly. Please be sensible with
										your choice.
									</p>
								</div>
								<div className="flex flex-row items-center gap-6 pr-4">
									<Avatar className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 border">
										<AvatarImage src={`/api/assets/avatars/${user.id}`} alt={user.username} />
										<AvatarFallback>
											{(user.username ?? "A").slice(0, 1).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<div className="my-2 flex flex-col gap-2">
										<AvatarUpload size="sm">Upload</AvatarUpload>
										{/* <AvatarRemove size="sm" variant="outline">
											Remove
										</AvatarRemove> */}
									</div>
								</div>
							</div>
							<div className="flex flex-row items-center justify-between gap-4 p-4">
								<span className="text-sm text-neutral-600 dark:text-neutral-400">
									Please use an image that is at least 256x256 pixels.
								</span>
							</div>
						</div>
						<div className="flex w-full flex-col rounded-md border">
							<div className="flex flex-col justify-between gap-4 border-b p-4 sm:flex-col sm:p-6">
								<div>
									<h1 className="text-xl font-bold">Banner</h1>
									<p className="text-sm">
										Your banner can be viewed publicly. Please be sensible with
										your choice.
									</p>
								</div>
								<div className="flex flex-col items-center gap-4 sm:flex-row">
									<AspectRatio ratio={4 / 1}>
										<Image
											src={`/api/assets/banners/${user.id}`}
											priority
											width={1400}
											height={250}
											alt="banner"
											className="h-full w-full rounded-md border border-black/10 object-cover dark:border-white/10"
										/>
									</AspectRatio>
									<div className="flex flex-row gap-2 sm:flex-col">
										<BannerUpload size="sm">Upload</BannerUpload>
										{/* <BannerRemove size="sm" variant="outline">
											Remove
										</BannerRemove> */}
									</div>
								</div>
							</div>
							<div className="flex flex-row items-center justify-between gap-4 p-4">
								<span className="text-sm text-neutral-600 dark:text-neutral-400">
									Please use an image that is at least 350x150 pixels.
								</span>
							</div>
						</div>
						<AccountCard
							title="Username"
							description="This is your unique username that will be used to identify you publicly."
							footer="Please use between 3 and 32 characters."
							action={
								<Button size="sm">
									Save
								</Button>
							}
						>
							<Input
								placeholder={user.username}
							/>
						</AccountCard>
						<AccountCard
							title="Display Name"
							description="Please enter your full name, or a display name you are comfortable with."
							footer="Please use 32 characters at maximum."
							action={
								<Button
									size="sm"
								>
									Save
								</Button>
							}
						>
							<Input
								placeholder={user.name}
							/>
						</AccountCard>
					</div>
				</>
			)}
		</>
	);
}