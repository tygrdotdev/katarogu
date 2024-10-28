import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyAccountSuccessPage() {
	return (
		<>
			<div className="flex flex-col items-center h-snug justify-center text-center w-full gap-6">
				<div>
					<h1 className="text-3xl font-bold">
						Welcome to Katarogu!
					</h1>
					<p className="text-neutral-500 dark:text-neutral-400">
						You have successfully verified your email address. You can now access all the features of Katarogu.
					</p>
				</div>
				<div className="flex flex-wrap gap-4">
					<Link href="/">
						<Button variant="secondary">
							Back to Dashboard
						</Button>
					</Link>
					<Link href="/account">
					<Button>
							Continue to Account
					</Button>
					</Link>
				</div>
			</div>
		</>
	)
}