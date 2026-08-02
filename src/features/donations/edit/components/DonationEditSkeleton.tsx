// src/features/donations/edit/components/DonationEditSkeleton.tsx

"use client"

import { Skeleton } from "@/components/ui/skeleton"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DonationEditSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        <Skeleton className="h-10 w-36" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Donor */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />

            <Skeleton className="h-16 w-full rounded-lg" />
          </div>

          {/* Amount + Payment */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />

              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />

              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />

            <Skeleton className="h-24 w-full" />
          </div>

          {/* Anonymous + Transaction */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />

              <Skeleton className="h-10 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />

              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-14" />

            <Skeleton className="h-32 w-full" />
          </div>

          {/* Dates */}
          <div className="grid gap-5 md:grid-cols-3">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t pt-6">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-36" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
