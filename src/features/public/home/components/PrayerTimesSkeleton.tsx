export function PrayerTimesSkeleton() {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mt-8 overflow-hidden rounded-3xl bg-muted p-10 animate-pulse">
                    <div className="grid gap-6 md:grid-cols-[auto_1fr_auto]">
                        <div className="h-40 rounded-xl bg-background/50" />
                        <div className="h-52 rounded-xl bg-background/50" />
                        <div className="h-40 rounded-xl bg-background/50" />
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-32 rounded-xl bg-background/50"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}