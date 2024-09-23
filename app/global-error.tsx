'use client'

import { Button } from "@/components/ui/button"
import { useEffect } from "react";

export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html>
			<body>
				<main className="flex h-full w-full flex-col items-center justify-center gap-4">
					<h1 className="text-3xl font-black">(╥﹏╥)</h1>
					<h2 className="text-center text-lg text-neutral-500 dark:text-neutral-400">
						Oops! Something went wrong.
					</h2>
					<code className="overflow-scroll max-w-2xl rounded-lg bg-neutral-200 p-2 text-sm dark:bg-neutral-800">
						{error.message}
					</code>
					<Button variant="outline" onClick={() => reset()}>
						Try again
					</Button>
				</main>
			</body>
		</html>
	)
}