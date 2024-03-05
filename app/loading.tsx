import Spinner from "@/components/spinner";

export default function Loading() {
	return (
		<div className="flex h-full min-h-snug w-full flex-col items-center justify-center gap-2">
			<Spinner />
		</div>
	);
}
