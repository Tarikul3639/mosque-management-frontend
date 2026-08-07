"use client"

import { CommandGroup } from "@/components/ui/command"
import { SearchItem } from "./SearchItem"
import type { SearchResult } from "@/types/search"

interface SearchGroupProps {
  title: string
  items: SearchResult[]
  onSelect: (item: SearchResult) => void
}

export function SearchGroup({ title, items, onSelect }: SearchGroupProps) {
  if (!items.length) return null

  return (
    <CommandGroup heading={title}>
      {items.map((item) => (
        <SearchItem key={item.id} item={item} onSelect={onSelect} />
      ))}
    </CommandGroup>
  )
}
