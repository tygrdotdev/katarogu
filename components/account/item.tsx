export default function AccountItem({ title, description, children, footer, action }: { title: string, description: string, children: React.ReactNode, footer: React.ReactNode, action: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col border rounded-md w-full">
                <div className="flex flex-col p-4 gap-4 border-b">
                    <div>
                        <h1 className="text-xl font-bold">
                            {title}
                        </h1>
                        <p className=" text-sm">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
                <div className="flex flex-row justify-between items-center p-4 gap-4">
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {footer}
                    </span>
                    {action}
                </div>
            </div>
        </>
    )
}