"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchShortcut } from "./components/SearchShortcut"

interface SearchTriggerProps {
  onOpen: () => void
}

export function SearchTrigger({ onOpen }: SearchTriggerProps) {
  return (
    <Button
      variant="outline"
      onClick={onOpen}
      className="w-full justify-between rounded-lg px-3 py-6 text-muted-foreground"
    >
      <div className="flex min-w-0 items-center gap-2">
        <Search className="size-4 shrink-0" />
        <span className="truncate">Search across mosque records</span>
      </div>

      <SearchShortcut keys={["⌘", "K"]} />
    </Button>
  )
}
