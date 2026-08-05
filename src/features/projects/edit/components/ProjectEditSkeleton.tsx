"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectEditSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <Skeleton className="h-24 w-full rounded-xl" />

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-48" />
                        </CardHeader>

                        <CardContent className="space-y-5">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    className="h-12 w-full rounded-lg"
                                />
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-5 w-36" />
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <Skeleton className="h-20 w-full rounded-lg" />
                                <Skeleton className="h-10 w-full rounded-lg" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}