import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"

export default function Alert({
    open,
    setOpen,
    title,
    description,
    footer,
    onSubmit,
    onCancel,
    ...props
}: {
    open: boolean,
    setOpen: (open: boolean) => void,
    title: string,
    description: string,
    footer?: string,
    onSubmit?: () => void,
    onCancel?: () => void
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const cancel = () => {
        setOpen(!open);
        onCancel && onCancel();
    }

    const submit = () => {
        setOpen(!open);
        onSubmit && onSubmit();
    }

    if (isDesktop) {
        return (
            <>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px] p-0 gap-0">
                        <DialogHeader className="p-6">
                            <DialogTitle>{title}</DialogTitle>
                            <DialogDescription>
                                {description}
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-row items-center justify-between gap-4 p-4 border-t bg-neutral-900/50">
                            {footer ? (
                                <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {footer}
                                </span>
                            ) : (
                                <Button variant="outline" onClick={cancel}>
                                    Cancel
                                </Button>
                            )}
                            <div className="flex flex-row gap-4">
                                {footer && (
                                    <Button variant="outline" onClick={cancel}>
                                        Cancel
                                    </Button>
                                )}
                                <Button variant="destructive" onClick={submit}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        )
    }

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>{title}</DrawerTitle>
                        <DrawerDescription>{description}</DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-row justify-between w-full gap-2 p-4 border-t">
                        <Button variant="outline" onClick={cancel}>Cancel</Button>
                        <Button variant="destructive" onClick={submit}>Confirm</Button>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    )
}