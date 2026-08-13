export function FinancialSummarySkeleton() {
  return (
    <section className="bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="h-5 w-32 animate-pulse rounded bg-border" />

          <div className="mt-6 grid animate-pulse gap-8 md:grid-cols-3">
            {/* Left */}
            <div className="space-y-3">
              <div className="h-4 w-24 rounded bg-border" />
              <div className="h-8 w-40 rounded bg-border" />
              <div className="h-3 w-32 rounded bg-border" />
              <div className="h-2.5 w-full rounded bg-border" />
            </div>

            {/* Center ring */}
            <div className="mx-auto size-36 rounded-full bg-border sm:size-40" />

            {/* Right */}
            <div className="space-y-3">
              <div className="h-4 w-24 rounded bg-border" />
              <div className="h-8 w-40 rounded bg-border" />
              <div className="h-3 w-40 rounded bg-border" />
              <div className="h-2.5 w-full rounded bg-border" />
            </div>
          </div>

          {/* Monthly row */}
          <div className="mt-8 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
            <div className="h-4 w-full rounded bg-border" />
            <div className="h-4 w-full rounded bg-border" />
            <div className="h-4 w-full rounded bg-border" />
          </div>
        </div>
      </div>
    </section>
  )
}
