"use client"

// src/components/common/entity-picker/EntityPickerEmpty.tsx
import { SearchX } from "lucide-react"

interface EntityPickerEmptyProps {
  title?: string
  description?: string
}

export function EntityPickerEmpty({
  title = "No results found",
  description = "Try another keyword.",
}: EntityPickerEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <SearchX className="size-7 text-muted-foreground" />
      </div>

      <h3 className="text-base font-semibold">{title}</h3>

      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
