"use client"

import { Card, CardContent } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

export function CommitteeEditSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <Skeleton className="h-16 w-full rounded-xl" />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <Card>
            <CardContent className="space-y-6 py-6">
              <Skeleton className="mx-auto size-32 rounded-full" />

              <div className="grid gap-5 md:grid-cols-2">
                {Array.from({
                  length: 8,
                }).map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-28" />

                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Skeleton className="h-10 w-24" />

                <Skeleton className="h-10 w-36" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 xl:col-span-4">
          <Card>
            <CardContent className="space-y-4 py-6">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-4 w-24" />

                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 py-6">
              <Skeleton className="h-5 w-40" />

              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
