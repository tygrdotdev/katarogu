"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Alert from "@/components/alert";
import { useState } from "react";

export default function BackButton({ confirm = false }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <Alert
                open={open}
                setOpen={setOpen}
                title="Are you sure?"
                description="If you go back, you will lose your progress."
                onSubmit={() => {
                    router.back();
                }}
            >
                <button className="flex flex-row gap-2 items-center text-neutral-500" onClick={confirm ? () => setOpen(!open) : router.back}>
                    <ArrowLeft size={16} />
                    <span className="text-lg font-medium">Back</span>
                </button>
            </Alert>
        </>
    )
}