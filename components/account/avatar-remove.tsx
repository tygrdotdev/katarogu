import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button, ButtonProps } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useAuth } from "../auth/provider"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export default function AvatarRemove(props: ButtonProps) {
    const { user, avatar, removeAvatar, isDefaultAvatar } = useAuth();
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const onSubmit = () => {
        removeAvatar();
        setOpen(false);
    }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button {...props} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-0">
                    <DialogHeader className="p-6">
                        <DialogTitle>Remove Avatar</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete your avatar?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-row items-center justify-between px-6 pb-4">
                        <Image src={avatar} className="w-32 h-32 rounded-full" alt="Current Avatar" />
                        <ArrowRight className="w-8 h-8 mx-4 text-neutral-500" />
                        <Image src={`https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${user?.username}&radius=50`} className="w-32 h-32 rounded-full" alt="New Avatar" />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-4 p-4 border-t bg-neutral-900/50">
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            This action is not reversible.
                        </span>
                        <Button variant="destructive" onClick={onSubmit}>
                            Confirm
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button {...props} disabled={isDefaultAvatar} />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Remove Avatar</DrawerTitle>
                    <DrawerDescription>Are you sure you want to delete your avatar?</DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-row items-center justify-center p-6">
                    <Image src={avatar} className="w-32 h-32 rounded-full" alt="Current Avatar" />
                    <ArrowRight className="w-8 h-8 mx-4 text-neutral-500" />
                    <Image src={`https://api.dicebear.com/7.x/lorelei-neutral/png?seed=${user?.username}&radius=50`} className="w-32 h-32 rounded-full" alt="New Avatar" />
                </div>
                <div className="flex flex-row justify-between w-full gap-2 p-4 border-t">
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={onSubmit}>Confirm</Button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}