"use client";

import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { useEffect } from "react";

export const metadata: Metadata = {
	title: "Oops",
	description: "Something went wrong while loading this page",
};

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<>
			<main className="flex min-h-screen-no-nav w-full flex-col items-center justify-center gap-4">
				<h1 className="text-3xl font-black">(╥﹏╥)</h1>
				<h2 className="text-center text-lg text-neutral-500 dark:text-neutral-400">
					Oops! Something went wrong while loading this page.
				</h2>
				<code className="overflow-scroll max-w-2xl rounded-lg bg-neutral-200 p-2 text-sm dark:bg-neutral-800">
					{error.message}
				</code>
				<Link href="/" passHref>
					<Button variant="outline" onClick={() => reset()}>
						Try again
					</Button>
				</Link>
			</main>
		</>
	);
}