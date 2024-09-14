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
		error: null
	});
	return (
		<form action={formAction} className={cn("w-full", className)}>
			<p>{state.error}</p>
			{children}
		</form>
	);
}

export interface ActionResult {
	error: string | null;
}