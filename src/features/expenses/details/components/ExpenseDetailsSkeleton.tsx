// src/features/expenses/details/components/ExpenseDetailsSkeleton.tsx

"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ExpenseDetailsSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <Skeleton className="h-10 w-72" />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-32 rounded-xl"
                    />
                ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <Skeleton className="h-105 rounded-xl" />
                <Skeleton className="h-105 rounded-xl" />
            </div>
        </div>
    );
}