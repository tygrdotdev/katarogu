"use client";

import { useAuth } from "@/components/auth/provider";

export default function ProfileMangaList() {
    const { user } = useAuth();
    return (
        <>
            {user && (
                <>
                    <p>
                        Manga List
                    </p>
                </>
            )}
        </>
    )
}