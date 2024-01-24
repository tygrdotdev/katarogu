"use client";

import AccountItem from "@/components/account/item";
import { useAuth } from "@/components/auth/provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

export default function AccountPage() {
    const { user, avatar, banner } = useAuth();

    const [name, setName] = useState(user?.name);
    const [username, setUsername] = useState(user?.username);

    return (
        <>
            {user && (
                <>
                    <div className="flex flex-col gap-4 pb-4 sm:gap-8">
                        <div className="flex flex-col w-full border rounded-md">
                            <div className="flex flex-row justify-between gap-4 p-4 border-b sm:flex-col">
                                <div>
                                    <h1 className="text-xl font-bold">
                                        Avatar
                                    </h1>
                                    <p className="text-sm">
                                        Click on the avatar to upload a custom one from your files.
                                    </p>
                                </div>
                                <div className="flex flex-row items-center gap-6 pr-4">
                                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                                        <AvatarImage src={avatar} alt={user.username} />
                                        <AvatarFallback>{user.username.slice(0, 1).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2 my-2w">
                                        <Button size="sm">
                                            Upload
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-4 p-4">
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Please use an image that is at least 256x256 pixels.
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col w-full border rounded-md">
                            <div className="flex flex-col justify-between gap-4 p-4 border-b sm:flex-col">
                                <div>
                                    <h1 className="text-xl font-bold">
                                        Banner
                                    </h1>
                                    <p className="text-sm">
                                        Click on the banner to upload a custom one from your files.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-4 sm:flex-row">
                                    <AspectRatio ratio={4 / 1}>
                                        <Image src={banner} priority width={1400} height={250} alt="banner" className="object-cover w-full h-full border rounded-md border-black/10 dark:border-white/10" />
                                    </AspectRatio>
                                    <div className="flex flex-row gap-2 sm:flex-col">
                                        <Button size="sm">
                                            Upload
                                        </Button>
                                        <Button size="sm" variant="outline">
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-4 p-4">
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                    Please use an image that is at least 350x150 pixels.
                                </span>
                            </div>
                        </div>
                        <AccountItem
                            title="Username"
                            description="This is your unique username that will be used to identify you publicly."
                            footer="Please use between 3 and 32 characters."
                            action={
                                <Button size="sm">
                                    Save
                                </Button>
                            }
                        >
                            <Input placeholder={user.username} value={username} onChange={(e) => setUsername(e.target.value)} className="" />
                        </AccountItem>
                        <AccountItem
                            title="Display Name"
                            description="Please enter your full name, or a display name you are comfortable with."
                            footer="Please use 32 characters at maximum."
                            action={
                                <Button size="sm">
                                    Save
                                </Button>
                            }
                        >
                            <Input placeholder={user.name} value={name} onChange={(e) => setName(e.target.value)} className="" />
                        </AccountItem>
                    </div>
                </>
            )}
        </>
    );
}