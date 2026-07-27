"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface StatsCardSkeletonProps {
    className?: string
}

export function StatsCardSkeleton({ className }: StatsCardSkeletonProps) {
    return (
        <div className={cn("rounded-xl border bg-card p-4", className)}>
            <div className="flex items-start gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />

                <div className="flex-1 space-y-3">
                    <Skeleton className="h-3 w-24" />

                    <Skeleton className="h-7 w-28" />

                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-12" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                </div>
            </div>
        </div>
    )
}

interface StatsCardsLoadingProps {
    count?: number
}

export function StatsCardsSkeletonMap({ count = 4 }: StatsCardsLoadingProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: count }).map((_, index) => (
                <StatsCardSkeleton key={index} />
            ))}
        </div>
    )
}
