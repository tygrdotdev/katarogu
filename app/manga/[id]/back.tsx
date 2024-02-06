"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button className="flex flex-row gap-2 items-center text-neutral-500" onClick={router.back}>
            <ArrowLeft size={16} />
            <span className="text-lg font-medium">Back</span>
        </button>
    )
}