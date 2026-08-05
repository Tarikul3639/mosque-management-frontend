"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectDetailsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <Skeleton className="h-24 w-full rounded-xl" />

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left */}

        <div className="space-y-6 xl:col-span-2">
          {/* Overview */}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <Skeleton className="h-6 w-44" />

              <Skeleton className="h-7 w-28 rounded-full" />
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-10" />
                </div>

                <Skeleton className="h-2 w-full rounded-full" />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-10" />
                </div>

                <Skeleton className="h-2 w-full rounded-full" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-3 rounded-lg border p-3">
                    <Skeleton className="h-4 w-20" />

                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gallery */}

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="aspect-video rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right */}

        <div className="space-y-6">
          {/* Timeline */}

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>

            <CardContent className="space-y-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-3 w-24" />

                  <Skeleton className="h-5 w-36" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Information */}

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>

            <CardContent className="space-y-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <Skeleton className="h-3 w-24" />

                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
