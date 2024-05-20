import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
	return (
		<>
			<main className="flex min-h-snug w-full flex-col items-center justify-center">
				<div className="flex flex-col items-center gap-8 text-center">
					<div className="flex flex-col items-center justify-center gap-2">
						<span className="rounded-full border-2 border-black/10 px-3 text-neutral-500 dark:border-white/10 ">
							Introducing Katarogu...
						</span>
						<div className="flex flex-col items-center gap-5">
							<h1 className="font-display text-4xl font-bold sm:text-5xl md:text-6xl">
								A new way to track your anime.
							</h1>
							<p className="text-md text-center text-neutral-400">
								Open, free, and community-driven. Katarogu is a new way to track
								everything anime and manga.
							</p>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<Button variant="outline">Learn More</Button>
						<Link href="/profile" passHref>
							<Button>Get Started</Button>
						</Link>
					</div>
				</div>
			</main>
		</>
	);
}
