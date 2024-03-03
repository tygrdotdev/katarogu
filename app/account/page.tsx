"use client";

import AccountCard from "@/components/account/card";
import { useAuth } from "@/components/auth/provider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

import AvatarRemove from "@/components/account/avatar-remove";
import AvatarUpload from "@/components/account/avatar-upload";
import BannerUpload from "@/components/account/banner-upload";
import BannerRemove from "@/components/account/banner-remove";
import pb from "@/lib/pocketbase";
import { toast } from "sonner";

export default function AccountPage() {
    const { user, avatar, banner } = useAuth();

    const [name, setName] = useState(user?.name);
    const [username, setUsername] = useState(user?.username);

    const handleSave = (formData: FormData, message?: string) => {
        toast.promise(pb.collection("users").update(user?.id, formData), {
            loading: "Saving...",
            success: (data) => {
                return message ?? "Your changes have been saved.";
            },
            error: "Sorry, we failed to save your changes"
        });
    }

    return (
        <>
            {user && (
                <>
                    <div className="flex flex-col gap-4 pb-4 sm:gap-8">
                        <div className="flex flex-col w-full border rounded-md">
                            <div className="flex flex-row justify-between gap-4 p-4 border-b sm:p-6 sm:flex-col">
                                <div>
                                    <h1 className="text-xl font-bold">
                                        Avatar
                                    </h1>
                                    <p className="text-sm">
                                        Your avatar can be viewed publicly. Please be sensible with your choice.
                                    </p>
                                </div>
                                <div className="flex flex-row items-center gap-6 pr-4">
                                    <Avatar className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                                        <AvatarImage src={avatar} alt={user.username} />
                                        <AvatarFallback>{(user.username ?? "A").slice(0, 1).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col gap-2 my-2">
                                        <AvatarUpload size="sm">
                                            Upload
                                        </AvatarUpload>
                                        <AvatarRemove size="sm" variant="outline">
                                            Remove
                                        </AvatarRemove>
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
                            <div className="flex flex-col justify-between gap-4 p-4 border-b sm:p-6 sm:flex-col">
                                <div>
                                    <h1 className="text-xl font-bold">
                                        Banner
                                    </h1>
                                    <p className="text-sm">
                                        Your banner can be viewed publicly. Please be sensible with your choice.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-4 sm:flex-row">
                                    <AspectRatio ratio={4 / 1}>
                                        <Image src={banner} priority width={1400} height={250} alt="banner" className="object-cover w-full h-full border rounded-md border-black/10 dark:border-white/10" />
                                    </AspectRatio>
                                    <div className="flex flex-row gap-2 sm:flex-col">
                                        <BannerUpload size="sm">
                                            Upload
                                        </BannerUpload>
                                        <BannerRemove size="sm" variant="outline">
                                            Remove
                                        </BannerRemove>
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
                                <Button size="sm" onClick={async () => {
                                    if (username === user.username) return toast.error("No changes were made.", {
                                        description: "Please make some changes before saving."
                                    });

                                    if (username.length < 3 || username.length > 16) return toast.error("Invalid username.", {
                                        description: "Your username must be between 3 and 16 characters long."
                                    });

                                    const formData = new FormData();
                                    formData.append("username", username);
                                    handleSave(formData, "Your username has been updated.");
                                }}>
                                    Save
                                </Button>
                            }
                        >
                            <Input placeholder={user.username} value={username} onChange={(e) => setUsername(e.target.value)} className="" />
                        </AccountCard>
                        <AccountCard
                            title="Display Name"
                            description="Please enter your full name, or a display name you are comfortable with."
                            footer="Please use 32 characters at maximum."
                            action={
                                <Button size="sm" onClick={async () => {
                                    if (name === user.name) return toast.error("No changes were made.", {
                                        description: "Please make some changes before saving."
                                    });

                                    if (name.length < 1 || name.length > 32) return toast.error("Invalid name.", {
                                        description: "Your name must be at least 32 characters long."
                                    });

                                    const formData = new FormData();
                                    formData.append("name", name);
                                    handleSave(formData, "Your name has been updated.");
                                }}>
                                    Save
                                </Button>
                            }
                        >
                            <Input placeholder={user.name} value={name} onChange={(e) => setName(e.target.value)} className="" />
                        </AccountCard>
                    </div>
                </>
            )}
        </>
    );
}
