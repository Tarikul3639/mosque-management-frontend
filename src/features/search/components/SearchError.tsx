"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

interface SearchErrorProps {
  onRetry?: () => void
}

export function SearchError({ onRetry }: SearchErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-5 text-destructive" />
      </div>

      <h3 className="text-sm font-semibold">Something went wrong</h3>

      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
        We couldn't load the search results. Please try again.
      </p>

      {onRetry && (
        <Button size="sm" variant="outline" className="mt-4" onClick={onRetry}>
          <RefreshCw className="mr-2 size-4" />
          Retry
        </Button>
      )}
    </div>
  )
}
