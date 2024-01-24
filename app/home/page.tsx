import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
    return (
        <>
            <main className="w-full min-h-snug items-center justify-center flex flex-col">
                <div className="flex flex-col gap-8 items-center text-center">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <span className="rounded-full px-3 text-neutral-500 border-black/10 dark:border-white/10 border-2 ">Introducing Katarogu...</span>
                        <div className="flex flex-col gap-5 items-center">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display">
                                A new way to track your anime.
                            </h1>
                            <p className="text-center text-md text-neutral-400">
                                Open, free, and community-driven. Katarogu is a new way to track everything anime and manga.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <Button variant="outline">
                            Learn More
                        </Button>
                        <Link href="/profile" passHref>
                            <Button>
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}