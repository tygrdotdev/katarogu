import Spinner from "@/components/spinner";

export default function Loading() {
    return (
        <div className='w-full gap-2 h-full flex flex-col items-center justify-center min-h-snug'>
            <Spinner />
        </div>
    )
}