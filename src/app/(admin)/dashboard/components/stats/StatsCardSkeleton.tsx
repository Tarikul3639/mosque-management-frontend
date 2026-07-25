"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function StatsCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 shrink-0 rounded-full" />

        <div className="min-w-0 flex-1">
          <Skeleton className="h-3 w-24" />

          <Skeleton className="mt-2 h-7 w-28" />

          <div className="mt-2 flex items-center gap-1">
            <Skeleton className="h-3.5 w-3.5 rounded-full" />

            <Skeleton className="h-3 w-10" />

            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
