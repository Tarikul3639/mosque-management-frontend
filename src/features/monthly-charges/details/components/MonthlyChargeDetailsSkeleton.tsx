"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function MonthlyChargeDetailsSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-9 w-72" />
                    <Skeleton className="h-4 w-44" />
                </div>

                <Skeleton className="h-10 w-36" />
            </div>

            <div className="grid gap-6 xl:grid-cols-12">
                {/* Information */}
                <div className="xl:col-span-8">
                    <Skeleton className="h-155 w-full rounded-xl" />
                </div>

                {/* Timeline */}
                <div className="xl:col-span-4">
                    <Skeleton className="h-80 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}