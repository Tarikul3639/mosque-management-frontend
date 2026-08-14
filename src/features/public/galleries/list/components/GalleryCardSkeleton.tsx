import { Skeleton } from "@/components/ui/skeleton"

interface GalleryCardSkeletonProps {
  count?: number
}

export function GalleryCardSkeleton({ count = 9 }: GalleryCardSkeletonProps) {
  return (
    <div className="container mx-auto grid gap-6 px-4 py-10 sm:grid-cols-2 md:px-6 md:py-14 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border bg-card">
          <Skeleton className="aspect-video w-full rounded-none" />

          <div className="space-y-4 p-5">
            <Skeleton className="h-6 w-2/3" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            <div className="flex items-center justify-between pt-2">
              <Skeleton className="h-4 w-24" />

              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
