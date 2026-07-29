"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function RecentExpensesLoading() {
  return (
    <Card className="h-95 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          <Skeleton className="h-6 w-40" />
        </CardTitle>

        <Skeleton className="h-8 w-20 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg px-2 py-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-11 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            <div className="space-y-2 text-right">
              <Skeleton className="ml-auto h-4 w-20" />
              <Skeleton className="ml-auto h-3 w-16" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
