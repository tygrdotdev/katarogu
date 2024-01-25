"use client";

import { useAuth } from "@/components/auth/provider"
import { Button } from "@/components/ui/button";
import { DeleteAccountConfirm } from "./confirm";

export default function DangerAccountPage() {
    const { user } = useAuth();

    return (
        <>
            {user && (
                <>
                    <div className="flex flex-col gap-4 pb-4 sm:gap-8">
                        <div className="flex flex-col w-full border rounded-md border-red-500/40">
                            <div className="flex flex-col gap-4 p-6 border-b border-red-500/40">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-xl font-bold">
                                        Delete Account
                                    </h1>
                                    <p className="text-sm">
                                        Permanently delete your account and all of its contents from the Katarogu platform. This action is not reversible, so please continue with caution.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-4 p-4 bg-red-500/10">
                                <div />
                                <DeleteAccountConfirm>
                                    <Button variant="destructive">
                                        Delete Account
                                    </Button>
                                </DeleteAccountConfirm>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}