"use client"

// src/features/user/details/components/UserDetailsSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function UserDetailsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left */}
        <Card className="h-110 overflow-hidden rounded-2xl py-0">
          <div className="h-24 bg-muted">
            <Skeleton className="h-full w-full rounded-none" />
          </div>

          <CardContent className="relative -mt-16 flex flex-col items-center pb-8">
            <Skeleton className="size-32 rounded-full" />

            <Skeleton className="mt-5 h-7 w-44" />
            <Skeleton className="mt-2 h-4 w-56" />
            <Skeleton className="mt-2 h-4 w-40" />

            <div className="mt-6 flex gap-2">
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </CardContent>
        </Card>

        {/* Right */}
        <div className="space-y-6 xl:col-span-2">
          {/* Information Card */}
          <Card>
            <CardContent className="space-y-5 pt-6">
              <Skeleton className="h-7 w-48" />
              <Skeleton className="h-4 w-72" />

              <div className="space-y-4 pt-2">
                {Array.from({
                  length: 6,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-5 w-52" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Activity Card */}
          <Card>
            <CardContent className="space-y-5 pt-6">
              <Skeleton className="h-7 w-40" />
              <Skeleton className="h-4 w-64" />

              <div className="space-y-4 pt-2">
                {Array.from({
                  length: 3,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-5 w-48" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
