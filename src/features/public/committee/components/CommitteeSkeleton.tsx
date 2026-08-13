export function CommitteeSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section className="bg-muted py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-border/80 sm:w-80" />

          {/* Divider Placeholder */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-border" />
            <span className="size-1.5 rotate-45 bg-border" />
            <span className="h-px w-8 bg-border" />
          </div>

          {/* Subtitle Placeholder */}
          <div className="mt-3 h-4 w-48 animate-pulse rounded bg-border/60" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="mt-10 md:mt-12">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(count)].map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-xl border border-border bg-card shadow-xs"
              >
                {/* Header Section */}
                <div className="relative border-b border-border bg-muted/30 px-6 pt-7 pb-6">
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 h-5 w-14 animate-pulse rounded-full bg-border/70" />

                  {/* Avatar */}
                  <div className="flex items-center justify-center">
                    <div className="size-30 animate-pulse rounded-full bg-border sm:size-32" />
                  </div>

                  {/* Name */}
                  <div className="mx-auto mt-4 h-5 w-3/4 animate-pulse rounded bg-border" />

                  {/* Designation */}
                  <div className="mt-2.5 flex justify-center">
                    <div className="h-5 w-24 animate-pulse rounded-md bg-border/70" />
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex h-11 w-full items-center px-6">
                  <div className="h-4 w-20 animate-pulse rounded bg-border/60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
