// src/features/payments/edit/components/PaymentEditSkeleton.tsx

"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function PaymentEditSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-52" />
        </div>

        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Form */}
        <div className="xl:col-span-8">
          <div className="rounded-xl border p-6">
            <div className="space-y-6">
              <Skeleton className="h-8 w-48" />

              <div className="grid gap-5 md:grid-cols-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className={
                      index >= 8 ? "space-y-2 md:col-span-2" : "space-y-2"
                    }
                  >
                    <Skeleton className="h-4 w-28" />

                    <Skeleton
                      className={index >= 8 ? "h-28 w-full" : "h-10 w-full"}
                    />
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

        {/* Danger Zone */}
        <div className="space-y-6 xl:col-span-4">
          <Skeleton className="h-67.5 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
