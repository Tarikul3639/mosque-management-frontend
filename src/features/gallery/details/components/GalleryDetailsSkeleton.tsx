"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function GalleryDetailsSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="space-y-3">
                <Skeleton className="h-8 w-40" />
                <Skeleton className="h-5 w-72" />
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                {/* Images */}
                <div className="xl:col-span-2">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="aspect-square w-full rounded-xl"
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Information */}
                <div>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-44" />
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <Skeleton className="size-5 rounded-full" />

                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-4 w-36" />
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
