"use client"

import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { useEffect } from "react";

export const metadata: Metadata = {
    title: "Oops",
    description: "Something went wrong while loading this page"
}

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    useEffect(() => {
        console.error(error)
    }, [error]);

    return (
        <>
            <main className="min-h-screen-no-nav flex flex-col w-full items-center justify-center gap-4">
                <h1 className="text-3xl font-black">
                    (╥﹏╥)
                </h1>
                <h2 className="text-lg text-center dark:text-neutral-400 text-neutral-500">
                    Oops! Something went wrong while loading this page.
                </h2>
                <code className="text-sm p-2 bg-neutral-800 rounded-lg">
                    {error.message}
                </code>
                <Link href="/" passHref>
                    <Button variant="outline" onClick={() => reset()}>
                        Try again
                    </Button>
                </Link>
            </main>
        </>
    )
}