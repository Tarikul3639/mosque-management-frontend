"use client"

import { History } from "lucide-react"
import { CommandGroup } from "@/components/ui/command"
import type { SearchResult } from "@/types/search"
import { SearchItem } from "./SearchItem"

interface SearchRecentProps {
  items: SearchResult[]
  onSelect?: (item: SearchResult) => void
}

export function SearchRecent({ items, onSelect }: SearchRecentProps) {
  if (!items.length) return null

  return (
    <CommandGroup heading="Recent Searches" className="px-2 py-1">
      {items.map((item) => (
        <SearchItem
          key={item.id}
          item={{
            ...item,
            icon: <History className="size-4 text-muted-foreground" />,
          }}
          onSelect={onSelect ?? (() => undefined)}
        />
      ))}
    </CommandGroup>
  )
}
