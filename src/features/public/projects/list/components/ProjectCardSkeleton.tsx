import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function ProjectCardSkeleton() {
  return (
    <Card className="animate-pulse overflow-hidden py-0">
      {/* Cover Image */}
      <div className="aspect-video bg-muted" />

      <CardContent className="space-y-5 p-5">
        {/* Title & Description */}
        <div className="space-y-3">
          <div className="h-5 w-2/3 rounded-md bg-muted" />

          <div className="space-y-2">
            <div className="h-3.5 w-full rounded bg-muted" />
            <div className="h-3.5 w-11/12 rounded bg-muted" />
            <div className="h-3.5 w-8/12 rounded bg-muted" />
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 w-16 rounded bg-muted" />
            <div className="h-3 w-10 rounded bg-muted" />
          </div>

          <div className="h-2 rounded-full bg-muted" />
        </div>

        {/* Budget */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4">
          <div className="space-y-2">
            <div className="h-3 w-12 rounded bg-muted" />
            <div className="h-5 w-20 rounded bg-muted" />
          </div>

          <div className="space-y-2">
            <div className="h-3 w-12 rounded bg-muted" />
            <div className="h-5 w-20 rounded bg-muted" />
          </div>
        </div>

        {/* Date */}
        <div className="h-4 w-40 rounded bg-muted" />
      </CardContent>

      <CardFooter className="border-t p-5">
        <div className="h-10 w-full rounded-md bg-muted" />
      </CardFooter>
    </Card>
  )
}

interface ProjectCardSkeletonGridProps {
  count?: number
}

export function ProjectCardSkeletonGrid({
  count = 6,
}: ProjectCardSkeletonGridProps) {
  return (
    <section className="container mx-auto px-4 pb-16">
      {/* Toolbar Skeleton */}
      <div className="mb-8 flex animate-pulse flex-col gap-4 rounded-2xl border bg-card p-5 md:flex-row md:items-center md:justify-between">
        <div className="h-10 w-full rounded-lg bg-muted md:max-w-sm" />

        <div className="flex gap-3">
          <div className="h-10 w-36 rounded-lg bg-muted" />
          <div className="h-10 w-28 rounded-lg bg-muted" />
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-8 flex animate-pulse items-center justify-between border-b pb-4">
        <div className="h-6 w-44 rounded bg-muted" />
        <div className="h-5 w-20 rounded bg-muted" />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
