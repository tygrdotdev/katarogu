"use client"

import Link from "next/link";
import { ThemeToggle } from "./theme/toggle";
import { Button } from "./ui/button";
import AuthPopup from "./auth/popup";
import { useAuth } from "./auth/provider";
import { Suspense } from "react";
import UserPopup from "./auth/user-popup";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Library } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default function Nav() {
    const { user } = useAuth();
    return (
        <>
            <nav className="w-full flex flex-col items-center">
                <div className="flex flex-row gap-2 items-center justify-between py-4 w-full">
                    <div className="flex flex-row gap-2 items-center">
                        <Link href="/" passHref className="flex flex-row gap-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 500 500" fill="none">
                                <path d="M61 145H400.774C425.164 313.333 379.99 392.12 379.99 392.12C379.99 392.12 352.103 450.814 251.671 429.233" stroke="currentColor" fill="none" strokeWidth="72" />
                                <path d="M218.008 20C229.479 120.843 214.136 347.822 61 449" stroke="currentColor" fill="none" strokeWidth="72" />
                            </svg>
                            <span className="text-xl font-bold -top-1/2 relative">Katarogu</span>
                        </Link>
                        <div className="flex-row items-center pl-8 gap-2 hidden sm:flex">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>Manga</NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                <li className="row-span-3">
                                                    <NavigationMenuLink asChild>
                                                        <a
                                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                            href="/manga"
                                                        >
                                                            <Library />
                                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                                All Manga
                                                            </div>
                                                            <p className="text-sm leading-tight text-muted-foreground">
                                                                The complete list of manga on Katarogu.
                                                            </p>
                                                        </a>
                                                    </NavigationMenuLink>
                                                </li>
                                                <ListItem href="/manga/top" title="Top Manga">
                                                    A list of the most popular manga on Katarogu.
                                                </ListItem>
                                                <ListItem href="/manga/search" title="Search">
                                                    Fully featured search for manga.
                                                </ListItem>
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                            </NavigationMenu>

                        </div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <ThemeToggle />
                        <Suspense fallback="Loading...">
                            {user ? (
                                <>
                                    <UserPopup />
                                </>
                            ) : (
                                <>
                                    <AuthPopup />
                                </>
                            )}
                        </Suspense>
                    </div>
                </div>
            </nav>
        </>
    )
}