"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DonorEditSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-3 border-b border-border/50 pb-5">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Avatar Card */}
        <div className="space-y-6 xl:col-span-4 2xl:col-span-3">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28" />
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-6">
              <Skeleton className="size-32 rounded-full" />

              <div className="space-y-2 text-center">
                <Skeleton className="mx-auto h-5 w-40" />
                <Skeleton className="mx-auto h-4 w-56" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
          {/* Form */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-44" />
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full md:col-span-2" />
              </div>

              <div className="flex justify-end">
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-80" />
                </div>

                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-72" />
                </div>

                <Skeleton className="h-10 w-36" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
