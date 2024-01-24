"use client";

import AccountItem from "@/components/account/item";
import { useAuth } from "@/components/auth/provider"
import { Button } from "@/components/ui/button";
import { DeleteAccountConfirm } from "./confirm";

export default function DangerAccountPage() {
    const { user } = useAuth();

    return (
        <>
            {user && (
                <>
                    <div className="flex flex-col gap-4 sm:gap-8 pb-4">
                        <div className="flex flex-col border rounded-md w-full border-red-600">
                            <div className="flex flex-col p-4 gap-4 border-b">
                                <div>
                                    <h1 className="text-xl font-bold">
                                        Delete Account
                                    </h1>
                                    <p className=" text-sm">
                                        Permanently delete your account and all of its contents from the Katarogu platform. This action is not reversible, so please continue with caution.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between items-center p-4 gap-4">
                                <div />
                                <DeleteAccountConfirm>
                                    <Button variant='destructive'>
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