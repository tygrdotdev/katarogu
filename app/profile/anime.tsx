"use client";

import { useAuth } from "@/components/auth/provider";

export default function ProfileAnimeList() {
    const { user } = useAuth();
    return (
        <>
            {user && (
                <>
                    <p>
                        Anime List
                    </p>
                </>
            )}
        </>
    )
}