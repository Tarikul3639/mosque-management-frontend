"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DonationExpenseChartLoading() {
  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="w-full">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="space-y-2">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-4 w-40" />
            </div>

            <Skeleton className="h-9 w-36" />
          </div>

          <div className="mt-4 flex items-center justify-center gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-sm" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full rounded-lg border bg-muted/20 p-6">
          <div className="flex h-full items-end justify-between gap-3">
            {Array.from({ length: 12 }).map((_, month) => (
              <div
                key={month}
                className="flex flex-1 items-end justify-center gap-1"
              >
                <Skeleton
                  className="w-3 rounded-t"
                  style={{
                    height: `${60 + ((month * 13) % 120)}px`,
                  }}
                />

                <Skeleton
                  className="w-3 rounded-t"
                  style={{
                    height: `${40 + ((month * 17) % 110)}px`,
                  }}
                />

                <Skeleton
                  className="w-3 rounded-t"
                  style={{
                    height: `${70 + ((month * 9) % 130)}px`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} className="h-3 w-6" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
