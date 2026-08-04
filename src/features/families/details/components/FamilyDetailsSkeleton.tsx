import { Skeleton } from "@/components/ui/skeleton"

export function FamilyDetailsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-28 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>

      {/* Profile + Overview */}
      <div className="grid gap-6 xl:grid-cols-12">
        {/* Profile */}
        <div className="xl:col-span-4 2xl:col-span-3">
          <div className="overflow-hidden rounded-2xl border">
            {/* Cover */}
            <Skeleton className="h-24 w-full rounded-none" />

            <div className="-mt-16 flex flex-col items-center px-6 pb-8">
              <Skeleton className="size-32 rounded-full border-4 border-background" />

              <Skeleton className="mt-4 h-8 w-44" />
              <Skeleton className="mt-2 h-4 w-24" />
              <Skeleton className="mt-4 h-7 w-24 rounded-full" />
            </div>
          </div>
        </div>

        {/* Overview */}
        <div className="xl:col-span-8 2xl:col-span-9">
          <div className="rounded-xl border p-6">
            <Skeleton className="mb-6 h-6 w-40" />

            <div className="space-y-1">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between py-3 ${
                    index !== 6 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>

                  <Skeleton className="h-4 w-40" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="rounded-xl border p-6">
        <Skeleton className="mb-6 h-6 w-44" />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-xl border p-5">
              <Skeleton className="mb-3 h-4 w-24" />
              <Skeleton className="h-8 w-28" />
            </div>
          ))}
        </div>
      </div>

      {/* Payment History */}
      <div className="rounded-xl border p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />

            <div className="mt-3 flex flex-wrap gap-2">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-36 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        </div>

        <Skeleton className="h-72 w-full rounded-xl" />
      </div>

      {/* Fee History */}
      <div className="rounded-xl border p-6">
        <div className="mb-6 space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-56" />
        </div>

        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    </div>
  )
}
