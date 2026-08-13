import { Skeleton } from "@/components/ui/skeleton"

export function ProjectDetailsSkeleton() {
  return (
    <section className="container mx-auto px-4 pb-16 md:px-6">
      <div className="space-y-6">
        {/* Hero Gallery */}
        <div className="overflow-hidden rounded-xl border bg-card">
          <Skeleton className="aspect-16/8 min-h-60 w-full sm:min-h-72 md:aspect-16/7 md:min-h-0" />

          {/* Thumbnails */}
          <div className="flex gap-2 border-t p-3 sm:p-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                className="size-14 shrink-0 rounded-md sm:size-16"
              />
            ))}
          </div>
        </div>

        {/* Project Information */}
        <div className="rounded-xl border bg-card">
          <div className="border-b p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-1 items-start gap-3">
                <Skeleton className="size-10 shrink-0 rounded-lg" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4 sm:h-7" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>

              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>

          <div className="space-y-6 p-5 sm:p-6">
            {/* Description */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-20" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Financial */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
            </div>

            {/* Dates / Creator */}
            <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
              <Skeleton className="h-14 rounded-lg" />
              <Skeleton className="h-14 rounded-lg" />
              <Skeleton className="h-14 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-xl border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-lg" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-56" />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-12" />
            </div>

            <Skeleton className="h-2.5 w-full" />
          </div>

          <div className="mt-6 border-t pt-5">
            <Skeleton className="mb-4 h-4 w-28" />

            <Skeleton className="h-2 w-full" />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="rounded-xl border bg-card p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-lg" />

            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>

          <div className="mt-6 space-y-7">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex gap-4">
                <Skeleton className="size-8 shrink-0 rounded-full" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-3 w-56" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
