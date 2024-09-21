"use client"

import { useFormState } from "react-dom";
import { cn } from "@/lib/utils";

export default function Form({
	children,
	className,
	action
}: {
	children: React.ReactNode;
	className?: React.FormHTMLAttributes<HTMLFormElement>["className"];
		action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
}) {
	const [state, formAction] = useFormState(action, {
		error: false,
		message: ""
	});

	return (
		<form
			action={formAction}
			className="flex w-full flex-col items-center gap-4"
		>
			{state.error && (
				<p className="text-center">
					{state.message}
				</p>
			)}
			{children}
		</form>
	);
}

export interface ActionResult {
	error: boolean;
	message: string | null;
}