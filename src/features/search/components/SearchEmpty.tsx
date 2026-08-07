"use client"

import { SearchX } from "lucide-react"

interface SearchEmptyProps {
  query: string
}

export function SearchEmpty({ query }: SearchEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
        <SearchX className="size-5 text-muted-foreground" />
      </div>

      <h3 className="text-sm font-semibold">No results found</h3>

      <p className="mt-1 max-w-xs text-xs text-muted-foreground">
        No results were found for{" "}
        <span className="font-medium text-foreground">"{query}"</span>.
      </p>
    </div>
  )
}
