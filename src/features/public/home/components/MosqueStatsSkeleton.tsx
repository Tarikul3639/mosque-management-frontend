/* --------------------------- Skeleton Component --------------------------- */
export function MosqueStatsSkeleton() {
    return (
        <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-muted shadow-sm lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
                <div
                    key={i}
                    className={`flex animate-pulse items-center justify-center gap-3 px-4 py-6 sm:gap-4 sm:px-6 sm:py-8 ${i % 2 === 1 ? "border-l border-border" : ""
                        } ${i >= 2 ? "border-t border-border" : ""} ${i > 0 ? "lg:border-l lg:border-border" : ""
                        } lg:border-t-0`}
                >
                    <div className="size-8 shrink-0 rounded-full bg-border sm:size-9" />
                    <div className="space-y-2">
                        <div className="h-6 w-20 rounded bg-border sm:h-7 sm:w-24" />
                        <div className="h-4 w-14 rounded bg-border sm:w-16" />
                    </div>
                </div>
            ))}
        </div>
    )
}
