"use client"

import AccountCard from "@/components/account/card";
import { useAuth } from "@/components/auth/provider";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import pb from "@/lib/pocketbase";
import { useState } from "react";
import { toast } from "sonner";

export default function AccountPrivacyPage() {
    const { user } = useAuth();
    const [visibility, setVisibility] = useState<string>(user?.visibility ?? "public");

    const handleSave = (formData: FormData, message?: string) => {
        toast.promise(pb.collection("users").update(user?.id, formData), {
            loading: "Saving...",
            success: (data) => {
                return message ?? "Your changes have been saved.";
            },
            error: "Something went wrong. Your changes couldn't be saved"
        });
    }

    return (
        <>
            {user && (
                <div className="flex flex-col gap-4 pb-4 sm:gap-8">
                    <AccountCard
                        title="Profile Visibility"
                        description="You can choose to make your profile public, unlisted, or private."
                        footer={`Your profile is currently ${user.visibility}.`}
                        action={(
                            <Button size="sm" onClick={async () => {
                                if (visibility === user.visibility) return toast.error("No changes were made.", {
                                    description: "Please make some changes before saving."
                                });

                                if (!["public", "unlisted", "private"].includes(visibility)) return toast.error("Invalid value.", {
                                    description: "Your visibility can only be 'public', 'unlisted' or 'private'."
                                });

                                const formData = new FormData();
                                formData.append("visibility", visibility);
                                handleSave(formData, `Your profile is now ${visibility}.`);
                            }}>
                                Save
                            </Button>
                        )}
                    >
                        <Select value={visibility} onValueChange={setVisibility}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Public" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="public" className="data-[current=true]:font-bold" data-current={user.visibility === "public"}>Public</SelectItem>
                                <SelectItem value="unlisted" className="data-[current=true]:font-bold" data-current={user.visibility === "unlisted"}>Unlisted</SelectItem>
                                <SelectItem value="private" className="data-[current=true]:font-bold" data-current={user.visibility === "private"}>Private</SelectItem>
                            </SelectContent>
                        </Select>
                    </AccountCard>
                </div>
            )}
        </>
    );
}