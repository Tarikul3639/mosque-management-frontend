import { Skeleton } from "@/components/ui/skeleton"

interface ExpenseCardSkeletonProps {
  count?: number
}

export function ExpenseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      {/* Header */}
      <div className="space-y-3 border-b p-5">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Content */}
      <div className="space-y-5 p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-28" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>

        <Skeleton className="h-px w-full" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </div>
  )
}

export function ExpenseCardSkeletonGrid({
  count = 12,
}: ExpenseCardSkeletonProps) {
  return (
    <section className="container mx-auto px-4 pb-16 md:px-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <ExpenseCardSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
