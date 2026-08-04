// src/components/common/entity-picker/EntityPickerDialog.tsx

"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { EntityPickerList } from "./EntityPickerList"
import type { EntityPickerOption } from "./types"

interface EntityPickerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  placeholder?: string
  search: string
  onSearchChange: (value: string) => void
  items: EntityPickerOption[]
  loading?: boolean
  selectedId?: string
  onSelect: (item: EntityPickerOption) => void
  emptyTitle?: string
  emptyDescription?: string
}

export function EntityPickerDialog({
  open,
  onOpenChange,

  title,

  placeholder = "Search...",

  search,
  onSearchChange,

  items,
  loading,

  selectedId,

  onSelect,

  emptyTitle,
  emptyDescription,
}: EntityPickerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            autoFocus
            value={search}
            placeholder={placeholder}
            className="pl-9"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <EntityPickerList
          items={items}
          loading={loading}
          selectedId={selectedId}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          onSelect={(item) => {
            onSelect(item)
            onOpenChange(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
