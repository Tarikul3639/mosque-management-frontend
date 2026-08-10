"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function CommitteeDetailsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-16 w-full rounded-xl" />

      <div className="grid gap-6 xl:grid-cols-12">
        <Card className="xl:col-span-4 2xl:col-span-3">
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <Skeleton className="size-32 rounded-full" />

            <Skeleton className="h-7 w-44" />

            <Skeleton className="h-5 w-32" />

            <Skeleton className="h-8 w-24 rounded-full" />
          </CardContent>
        </Card>

        <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
          <Card>
            <CardContent className="space-y-5 py-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="size-10 rounded-full" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />

                    <Skeleton className="h-5 w-56" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-6 py-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="size-10 rounded-full" />

                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-28" />

                    <Skeleton className="h-5 w-44" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
