"use client"

import { CommandShortcut } from "@/components/ui/command"

export function SearchFooter() {
  return (
    <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">
            ↑↓
          </kbd>
          <span>Navigate</span>
        </div>

        <div className="flex items-center gap-1.5">
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-[10px]">
            ↵
          </kbd>
          <span>Open</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <CommandShortcut>Esc</CommandShortcut>
        <span>Close</span>
      </div>
    </div>
  )
}
