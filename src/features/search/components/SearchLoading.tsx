"use client"

import { Loader2 } from "lucide-react"

export function SearchLoading() {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" />
      <span>Searching...</span>
    </div>
  )
}
