// src/components/common/entity-picker/EntityPickerItem.tsx

"use client"

import { Check } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { getAvatarInitials } from "@/utils/avatar.utils"

import type { EntityPickerOption as Entity } from "./types"

interface EntityPickerItemProps {
  item: Entity
  selected?: boolean
  onSelect: (item: Entity) => void
}

export function EntityPickerItem({
  item,
  selected = false,
  onSelect,
}: EntityPickerItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      className="flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-colors hover:bg-accent"
    >
      <Avatar className="size-11">
        <AvatarImage src={item.avatar ?? undefined} />

        <AvatarFallback>{getAvatarInitials(item.title)}</AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium">{item.title}</p>

          {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
        </div>

        {item.subtitle && (
          <p className="truncate text-sm text-muted-foreground">
            {item.subtitle}
          </p>
        )}

        {item.description && (
          <p className="truncate text-xs text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>

      {selected ? (
        <span
          className={buttonVariants({
            size: "sm",
          })}
        >
          <Check className="mr-2 size-4" />
          Selected
        </span>
      ) : (
        <span
          className={buttonVariants({
            size: "sm",
            variant: "outline",
          })}
        >
          Select
        </span>
      )}
    </button>
  )
}
