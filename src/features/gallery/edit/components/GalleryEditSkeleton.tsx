"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { Skeleton } from "@/components/ui/skeleton"

export function GalleryEditSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="space-y-3">
                <Skeleton className="h-10 w-72" />

                <Skeleton className="h-5 w-130" />
            </div>

            <div className="grid gap-6 xl:grid-cols-3">
                {/* Left */}
                <div className="space-y-6 xl:col-span-2">
                    {/* Image Upload */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-36" />

                                <Skeleton className="h-4 w-72" />
                            </div>

                            <Skeleton className="h-9 w-28" />
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                                {Array.from({
                                    length: 8,
                                }).map((_, index) => (
                                    <Skeleton key={index} className="aspect-square rounded-xl" />
                                ))}
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <Skeleton className="h-4 w-28" />

                                <Skeleton className="h-4 w-40" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Form */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-40" />
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20" />

                                <Skeleton className="h-10 w-full" />
                            </div>

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-24" />

                                <Skeleton className="h-36 w-full" />
                            </div>

                            <div className="space-y-2">
                                <Skeleton className="h-4 w-28" />

                                <Skeleton className="h-10 w-full" />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />

                                    <Skeleton className="h-10 w-full" />
                                </div>

                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-24" />

                                    <Skeleton className="h-10 w-full" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Skeleton className="h-10 w-24" />

                                <Skeleton className="h-10 w-36" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                    {/* Order Card */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-36" />

                            <Skeleton className="h-4 w-full" />
                        </CardHeader>

                        <CardContent className="space-y-5">
                            <Skeleton className="h-10 w-full" />

                            <Skeleton className="h-20 w-full rounded-xl" />
                        </CardContent>
                    </Card>

                    {/* Danger Zone */}
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-6 w-32" />

                            <Skeleton className="h-4 w-full" />

                            <Skeleton className="h-4 w-3/4" />
                        </CardHeader>

                        <CardContent>
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
