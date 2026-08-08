"use client"

// src/components/common/entity-picker/EntityPickerTrigger.tsx
import { ChevronsUpDown, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { getAvatarInitials } from "@/utils/avatar.utils"

interface EntityPickerTriggerProps {
  label?: string
  value?: string
  subtitle?: string
  avatar?: string | null
  placeholder?: string
  readonly?: boolean
  onClick?: () => void
}

export function EntityPickerTrigger({
  label,
  value,
  subtitle,
  avatar,
  readonly = false,
  placeholder = "Select...",
  onClick,
}: EntityPickerTriggerProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      <Button
        type="button"
        variant="outline"
        onClick={onClick}
        disabled={readonly}
        className="h-auto w-full justify-between p-3"
      >
        {value ? (
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={avatar ?? undefined} />

              <AvatarFallback>{getAvatarInitials(value)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 text-left">
              <p className="truncate font-medium">{value}</p>

              {subtitle && (
                <p className="truncate text-xs text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Search className="size-4" />

            <span>{placeholder}</span>
          </div>
        )}

        <ChevronsUpDown className="ml-4 size-4 shrink-0 text-muted-foreground" />
      </Button>
    </div>
  )
}
