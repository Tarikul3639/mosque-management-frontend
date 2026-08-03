// src/features/expenses/edit/components/ExpenseEditSkeleton.tsx

"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function ExpenseEditSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-md" />

          <div className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-5 w-36 rounded-full" />
          </div>
        </div>

        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Form */}
        <div className="xl:col-span-8">
          <Skeleton className="h-190 w-full rounded-xl" />
        </div>

        {/* Sidebar */}
        <div className="space-y-6 xl:col-span-4">
          <Skeleton className="h-130 w-full rounded-xl" />

          <Skeleton className="h-45 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
