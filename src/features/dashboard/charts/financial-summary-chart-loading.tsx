"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function FinancialSummaryChartLoading() {
  return (
    <Card className="h-full rounded-xl">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>

              <Skeleton className="h-5 w-14" />
            </div>

            <Skeleton className="h-3 w-full rounded-full" />
          </div>
        ))}

        <div className="rounded-lg border p-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-3 h-6 w-40" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-1 h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}
