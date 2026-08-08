"use client"

// src/features/user/edit/components/UserEditSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function UserEditSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left */}
        <Card className="h-110">
          <CardContent className="flex flex-col items-center gap-5 pt-8">
            <Skeleton className="size-32 rounded-full" />

            <div className="space-y-2 text-center">
              <Skeleton className="mx-auto h-5 w-36" />
              <Skeleton className="mx-auto h-4 w-52" />
              <Skeleton className="mx-auto h-4 w-44" />
            </div>
          </CardContent>
        </Card>

        {/* Right */}
        <div className="space-y-6 xl:col-span-2">
          {/* Basic Information */}
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full md:col-span-2" />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-44" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>

            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full md:col-span-2" />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-80" />
            </CardHeader>

            <CardContent className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-72" />
              </div>

              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
