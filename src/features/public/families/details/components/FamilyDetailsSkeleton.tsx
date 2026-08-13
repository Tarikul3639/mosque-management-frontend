import { Skeleton } from "@/components/ui/skeleton"

export function FamilyDetailsSkeleton() {
    return (
        <section className="mx-auto container space-y-6 px-4 pb-16">
            {/* Profile */}
            <div className="rounded-xl border bg-card p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <Skeleton className="size-24 rounded-full" />

                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-7 w-56" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-72" />
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left */}
                <div className="space-y-6">
                    <div className="rounded-xl border bg-card p-5">
                        <Skeleton className="mb-5 h-5 w-40" />

                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-3/4" />
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <Skeleton className="mb-5 h-5 w-36" />

                        <div className="space-y-4">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    </div>
                </div>

                {/* Ledger */}
                <div className="lg:col-span-2 rounded-xl border bg-card p-5">
                    <Skeleton className="mb-5 h-6 w-52" />

                    <div className="space-y-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="rounded-lg border p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>

                                <div className="mt-4 grid gap-3 md:grid-cols-3">
                                    <Skeleton className="h-12 rounded-lg" />
                                    <Skeleton className="h-12 rounded-lg" />
                                    <Skeleton className="h-12 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}