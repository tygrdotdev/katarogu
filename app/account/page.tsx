"use client";

import ProfileHeader from "@/components/auth/profile-header";
import ProtectedPage from "@/components/auth/protected";
import { useAuth } from "@/components/auth/provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccountPage() {
    const { user } = useAuth();
    return (
        <>
            <ProtectedPage>
                {user && (
                    <ProfileHeader>
                        <Link href="/profile">
                            <Button size="sm">
                                View Profile
                            </Button>
                        </Link>
                    </ProfileHeader>
                )}
            </ProtectedPage>
        </>
    );
}