"use client"

// src/components/common/entity-picker/EntityPickerSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

interface EntityPickerSkeletonProps {
  rows?: number
}

export function EntityPickerSkeleton({ rows = 6 }: EntityPickerSkeletonProps) {
  return (
    <div className="space-y-3 p-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg border p-3"
        >
          <Skeleton className="size-12 rounded-full" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-40" />

            <Skeleton className="h-3 w-28" />

            <Skeleton className="h-3 w-56" />
          </div>

          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      ))}
    </div>
  )
}
