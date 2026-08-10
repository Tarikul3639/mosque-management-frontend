"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

interface FinancialSummaryErrorProps {
  message?: string
}

export function FinancialSummaryError({ message }: FinancialSummaryErrorProps) {
  return (
    <section className="bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="size-7 text-destructive" />
            </div>

            <div>
              <p className="text-base font-semibold text-foreground">
                আর্থিক তথ্য লোড করা যায়নি
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {message ??
                  "কিছু একটা সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
            >
              <RefreshCw className="size-3.5" />
              আবার চেষ্টা করুন
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
