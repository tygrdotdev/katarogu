"use client";

import ProtectedPage from "@/components/auth/protected";
import { useAuth } from "@/components/auth/provider";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const { user, signOut } = useAuth();
    return (
        <ProtectedPage>
            <h1 className="text-3xl font-bold">What's up, {user?.username}?</h1>
            <Button onClick={() => signOut()}>Sign Out</Button>
        </ProtectedPage>
    )
}