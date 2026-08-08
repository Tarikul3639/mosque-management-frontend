"use client"

// src/components/common/entity-picker/EntityPickerList.tsx
import { ScrollArea } from "@/components/ui/scroll-area"

import { EntityPickerEmpty } from "./EntityPickerEmpty"
import { EntityPickerItem } from "./EntityPickerItem"
import { EntityPickerSkeleton } from "./EntityPickerSkeleton"

import type { EntityPickerOption as Entity } from "./types"

interface EntityPickerListProps {
  items: Entity[]

  loading?: boolean

  selectedId?: string

  emptyTitle?: string
  emptyDescription?: string

  onSelect: (item: Entity) => void
}

export function EntityPickerList({
  items,
  loading = false,
  selectedId,
  emptyTitle,
  emptyDescription,
  onSelect,
}: EntityPickerListProps) {
  if (loading) {
    return <EntityPickerSkeleton />
  }

  if (items.length === 0) {
    return (
      <EntityPickerEmpty title={emptyTitle} description={emptyDescription} />
    )
  }

  return (
    <ScrollArea className="h-105">
      <div className="space-y-2 p-2">
        {items.map((item) => (
          <EntityPickerItem
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
