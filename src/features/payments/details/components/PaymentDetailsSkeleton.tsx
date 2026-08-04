"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function PaymentDetailsSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-9 w-72" />
                    <Skeleton className="h-4 w-52" />
                </div>

                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-12">
                <div className="xl:col-span-8">
                    <Skeleton className="h-180 w-full rounded-xl" />
                </div>

                <div className="xl:col-span-4">
                    <Skeleton className="h-105 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}