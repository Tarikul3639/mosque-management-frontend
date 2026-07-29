"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DonorDetailsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-3 border-b border-border/50 pb-5">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Profile Card */}
        <Card className="overflow-hidden rounded-2xl py-0 xl:col-span-4 2xl:col-span-3">
          <Skeleton className="h-24 w-full rounded-none" />

          <CardContent className="relative flex flex-col items-center px-6 pb-8">
            <Skeleton className="-mt-16 size-32 rounded-full border-4 border-background" />

            <Skeleton className="mt-4 h-7 w-44" />
            <Skeleton className="mt-2 h-4 w-32" />
            <Skeleton className="mt-4 h-8 w-24 rounded-full" />
          </CardContent>
        </Card>

        {/* Overview Card */}
        <Card className="xl:col-span-8 2xl:col-span-9">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>

          <CardContent className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-52" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}