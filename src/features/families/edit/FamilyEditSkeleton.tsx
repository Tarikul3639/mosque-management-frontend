"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FamilyEditSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="space-y-3 border-b border-border/50 pb-5">
                <Skeleton className="h-8 w-36" />

                <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-9 w-56" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <Skeleton className="h-4 w-80 max-w-full" />
            </div>

            <div className="grid gap-6 xl:grid-cols-12">
                {/* Profile Card */}
                <div className="xl:col-span-4 2xl:col-span-3">
                    <div className="overflow-hidden rounded-2xl border">
                        <Skeleton className="h-24 w-full rounded-none" />

                        <div className="flex flex-col items-center px-6 pb-8">
                            <Skeleton className="-mt-16 size-32 rounded-full" />

                            <Skeleton className="mt-4 h-7 w-44" />
                            <Skeleton className="mt-2 h-4 w-28" />
                            <Skeleton className="mt-4 h-7 w-24 rounded-full" />
                            <Skeleton className="mt-6 h-4 w-48" />
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="xl:col-span-8 2xl:col-span-9">
                    <div className="rounded-xl border">
                        <div className="border-b p-6">
                            <Skeleton className="h-6 w-40" />
                        </div>

                        <div className="space-y-6 p-6">
                            {/* Form Fields */}
                            <div className="grid gap-5 md:grid-cols-2">
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="space-y-2"
                                    >
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                ))}
                            </div>

                            {/* Readonly Fields */}
                            <div className="grid gap-5 border-t pt-6 md:grid-cols-2">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="space-y-2"
                                    >
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 border-t pt-6">
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-36" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}