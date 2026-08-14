import { Skeleton } from "@/components/ui/skeleton"

export function GalleryDetailsSkeleton() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <Skeleton className="aspect-16/8 w-full md:aspect-16/7" />

        <div className="border-b bg-background">
          <div className="container mx-auto flex gap-3 overflow-hidden px-4 py-4 md:px-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton
                key={index}
                className="aspect-video h-18 shrink-0 rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-8 md:px-6 md:py-10">
        <div className="space-y-6">
          {/* Gallery Info */}
          <div className="rounded-xl border">
            <div className="border-b p-6">
              <Skeleton className="h-6 w-40" />
            </div>

            <div className="space-y-6 p-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-8/12" />
              </div>

              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Skeleton className="size-4 rounded" />
                      <Skeleton className="h-4 w-28" />
                    </div>

                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          <div>
            <Skeleton className="mb-5 h-6 w-36" />

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="aspect-square rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
