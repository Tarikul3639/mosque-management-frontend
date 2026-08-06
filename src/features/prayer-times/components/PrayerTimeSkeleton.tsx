"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

export function PrayerTimeSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <div className="space-y-3">
                <Skeleton className="h-9 w-56" />
                <Skeleton className="h-5 w-96" />
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="mt-2 h-4 w-64" />
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {Array.from({
                                length: 7,
                            }).map((_, index) => (
                                <div key={index} className="space-y-2">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                            <Skeleton className="mt-2 h-4 w-full" />
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {Array.from({
                                length: 10,
                            }).map((_, index) => (
                                <Skeleton key={index} className="h-10 w-full" />
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
