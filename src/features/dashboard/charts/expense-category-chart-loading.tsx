"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ExpenseCategoryChartLoading() {
  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-40" />
        </div>

        <Skeleton className="h-9 w-36" />
      </CardHeader>

      <CardContent>
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          {/* Chart */}
          <div className="flex items-center justify-center">
            <div className="relative flex h-80 w-80 items-center justify-center">
              <Skeleton className="size-64 rounded-full" />

              <div className="absolute flex flex-col items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-4">
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-3 rounded-full" />
                  <Skeleton className="h-4 w-36" />
                </div>

                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
