"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const MONTHS = Array.from({ length: 12 })
const LEGENDS = Array.from({ length: 3 })

export function DonationExpenseChartLoading() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-56" />
            <Skeleton className="h-4 w-40" />
          </div>

          <Skeleton className="h-9 w-36" />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-6">
          {LEGENDS.map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="size-4 rounded-sm" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border bg-muted/20 p-6">
          <div className="flex h-80 items-end justify-between gap-3">
            {MONTHS.map((_, month) => (
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

          <div className="mt-5 flex justify-between">
            {MONTHS.map((_, index) => (
              <Skeleton key={index} className="h-3 w-6" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
