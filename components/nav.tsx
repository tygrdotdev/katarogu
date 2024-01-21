import Link from "next/link";
import { ThemeToggle } from "./theme/toggle";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import AuthDrawer from "./auth/drawer";

export default function Nav() {
    return (
        <>
            <nav className="w-full flex flex-col items-center">
                <div className="flex flex-row gap-2 items-center justify-between py-4 w-full">
                    <div className="flex flex-row gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 500 500" fill="none">
                            <path d="M61 145H400.774C425.164 313.333 379.99 392.12 379.99 392.12C379.99 392.12 352.103 450.814 251.671 429.233" stroke="currentColor" fill="none" strokeWidth="72" />
                            <path d="M218.008 20C229.479 120.843 214.136 347.822 61 449" stroke="currentColor" fill="none" strokeWidth="72" />
                        </svg>
                        <span className="text-xl font-bold -top-1/2 relative">Katagoru</span>
                        <div className="flex-row items-center pl-8 gap-4 hidden sm:flex">
                            <Link href="#features">
                                <Button variant="outline">
                                    Features
                                </Button>
                            </Link>
                            <Link href="#supported-sites">
                                <Button variant="outline">
                                    Supported Sites
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <ThemeToggle />
                        <AuthDrawer />
                    </div>
                </div>
            </nav>
        </>
    )
}