"use client"

import { CommandItem } from "@/components/ui/command"

import type { SearchResult } from "@/types/search"

interface SearchItemProps {
  item: SearchResult
  onSelect: (item: SearchResult) => void
}

export function SearchItem({ item, onSelect }: SearchItemProps) {
  return (
    <CommandItem
      value={item.title}
      onSelect={() => onSelect(item)}
      className="flex items-center gap-3"
    >
      {item.icon}

      <div className="flex flex-col">
        <span>{item.title}</span>

        {item.subtitle && (
          <span className="text-xs text-muted-foreground">{item.subtitle}</span>
        )}
      </div>
    </CommandItem>
  )
}
