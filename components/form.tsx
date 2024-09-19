"use client";

import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";

export function Form({
	children,
	className,
	action
}: {
	children: React.ReactNode;
	className?: React.FormHTMLAttributes<HTMLFormElement>["className"];
	action: (prevState: unknown, formData: FormData) => Promise<ActionResult>;
}) {
	const [state, formAction] = useFormState(action, {
		error: false,
		message: ""
	});
	return (
		<form action={formAction} className={cn("w-full", className)}>
			<p>{typeof state.message !== "undefined" && state.message}</p>
			{children}
		</form>
	);
}

export interface ActionResult {
	error: boolean;
	message: string | null;
}