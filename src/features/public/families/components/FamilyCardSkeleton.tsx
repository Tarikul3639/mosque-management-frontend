export const FamilyCardSkeleton = () => {
    return (
        <div className="animate-pulse rounded-xl border border-border bg-card p-4 shadow-xs">
            {/* Header */}
            <div className="flex items-center gap-3.5">
                {/* Avatar */}
                <div className="size-12 shrink-0 rounded-full bg-muted" />

                {/* Name + Family No */}
                <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded-md bg-muted" />
                    <div className="h-3 w-20 rounded-md bg-muted/70" />
                </div>
            </div>

            {/* Family information */}
            <div className="mt-4 space-y-2.5">
                <div className="h-3.5 w-full rounded-md bg-muted" />
                <div className="h-3.5 w-4/5 rounded-md bg-muted/80" />
            </div>

            {/* Action */}
            <div className="mt-4 border-t border-border/60 pt-4">
                <div className="h-9 w-full rounded-md bg-muted" />
            </div>
        </div>
    )
}

interface FamilyCardSkeletonGridProps {
    count?: number
}

export const FamilyCardSkeletonGrid = ({
    count = 6,
}: FamilyCardSkeletonGridProps) => {
    return (
        <section className="mx-auto max-w-6xl px-4 pb-16">
            {/* Section header skeleton */}
            <div className="mb-4 flex items-center justify-between border-b border-border/60 py-3">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-28 animate-pulse rounded-md bg-muted" />

                    <div className="h-5 w-8 animate-pulse rounded-md bg-muted" />
                </div>

                <div className="h-3.5 w-16 animate-pulse rounded-md bg-muted/70" />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }).map((_, index) => (
                    <FamilyCardSkeleton key={index} />
                ))}
            </div>
        </section>
    )
}