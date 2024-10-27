"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
	const path = usePathname();

	return (
		<>
			<div className="flex w-full flex-col gap-2 p-2 sm:w-1/4">
				<Link href="/account" className="w-full">
					<Button
						variant="ghost"
						className={cn(
							"w-full justify-start",
							`${path === "/account"
								? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
								: ""
							}`
						)}
					>
						General
					</Button>
				</Link>
				<Link href="/account/privacy" className="w-full">
					<Button
						variant="ghost"
						className={cn(
							"w-full justify-start",
							`${path === "/account/privacy"
								? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
								: ""
							}`
						)}
					>
						Privacy
					</Button>
				</Link>
				<Link href="/account/oauth" className="w-full">
					<Button
						variant="ghost"
						className={cn(
							"w-full justify-start flex flex-row gap-2",
							`${path === "/account/oauth"
								? "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50"
								: ""
							}`
						)}
					>
						<span>OAuth</span>
						<Badge variant="default">Beta</Badge>
					</Button>
				</Link>
				<Link href="/account/danger" className="w-full">
					<Button
						variant="ghost"
						className={cn(
							"w-full justify-start hover:bg-red-500 hover:text-neutral-100 dark:hover:bg-red-700",
							`${path === "/account/danger"
								? "bg-red-500 text-neutral-100 dark:bg-red-700 dark:text-neutral-50"
								: ""
							}`
						)}
					>
						Danger Zone
					</Button>
				</Link>
			</div>
		</>
	)
}