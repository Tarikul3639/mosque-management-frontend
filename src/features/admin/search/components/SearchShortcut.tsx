"use client"

import { cn } from "@/lib/utils"

interface SearchShortcutProps {
  keys: string | string[]
  className?: string
}

export function SearchShortcut({ keys, className }: SearchShortcutProps) {
  const values = Array.isArray(keys) ? keys : [keys]

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {values.map((key) => (
        <kbd
          key={key}
          className="inline-flex h-5 min-w-5 items-center justify-center rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground shadow-xs"
        >
          {key}
        </kbd>
      ))}
    </div>
  )
}
