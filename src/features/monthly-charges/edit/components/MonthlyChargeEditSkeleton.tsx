// src/features/monthly-charges/edit/components/MonthlyChargeEditSkeleton.tsx

"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function MonthlyChargeEditSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-9 w-72" />
          <Skeleton className="h-4 w-52" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Form */}
        <div className="xl:col-span-8">
          <div className="rounded-xl border p-6">
            <div className="space-y-6">
              <Skeleton className="h-7 w-48" />

              <div className="grid gap-5 md:grid-cols-2">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 border-t pt-6">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-36" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6 xl:col-span-4">
          <Skeleton className="h-135 w-full rounded-xl" />

          <Skeleton className="h-55 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
