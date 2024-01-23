"use client";

import { useAuth } from "@/components/auth/provider";

export default function ProfileOverview() {
    const { user } = useAuth();
    return (
        <>
            {user && (
                <>
                    <p>
                        Stats
                    </p>
                </>
            )}
        </>
    )
}