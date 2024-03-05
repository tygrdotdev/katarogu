import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "404 - Not Found",
	description: "This page doesn't exist or you don't have access to it.",
};

export default function NotFound() {
	return (
		<>
			<main className="flex min-h-screen-no-nav w-full flex-col items-center justify-center gap-4">
				<h1 className="text-3xl font-black">┐(￣∀￣)┌</h1>
				<h2 className="text-lg">
					This page doesn&apos;t exist or you don&apos;t have access to it.
				</h2>
				<Link href="/" passHref>
					<Button variant="outline">Back to safety</Button>
				</Link>
			</main>
		</>
	);
}
