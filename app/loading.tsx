import Spinner from "@/components/spinner";

export default function GlobalLoading() {
    return (
        <div className='w-full gap-2 h-full flex flex-col items-center justify-center min-h-snug'>
            <Spinner />
        </div>
    )
}