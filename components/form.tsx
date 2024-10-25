"use client"

import { useFormState } from "react-dom";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	children: React.ReactNode;
	formAction: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
}

export default function Form({ children, formAction: action, ...props }: FormProps) {
	const [state, formAction] = useFormState(action, {
		error: false,
		message: ""
	});

	return (
		<form
			action={formAction}
			className="flex w-full flex-col items-center gap-4"
			{...props}
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