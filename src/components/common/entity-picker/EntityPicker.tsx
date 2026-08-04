// src/components/common/entity-picker/EntityPicker.tsx

"use client"

import { useEffect, useMemo } from "react"

import { useEntityPicker } from "./hooks"

import { EntityPickerDialog } from "./EntityPickerDialog"
import { EntityPickerTrigger } from "./EntityPickerTrigger"

import type { EntityPickerOption } from "./types"

interface EntityPickerProps {
  label?: string
  value?: string
  items: EntityPickerOption[]
  loading?: boolean
  readonly?: boolean
  title?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyTitle?: string
  emptyDescription?: string
  onSearch?: (value: string) => void
  onChange: (id: string) => void
}

export function EntityPicker({
  label,
  value,
  items,
  loading = false,
  readonly = false,
  title,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyTitle,
  emptyDescription,
  onSearch,
  onChange,
}: EntityPickerProps) {
  const {
    open,
    search,

    setSearch,
    openPicker,
    onOpenChange,
  } = useEntityPicker()

  useEffect(() => {
    onSearch?.(search)
  }, [search, onSearch])

  const selectedItem = useMemo(
    () => items.find((item) => item.id === value),
    [items, value]
  )

  return (
    <>
      <EntityPickerTrigger
        label={label}
        value={selectedItem?.title}
        subtitle={selectedItem?.subtitle}
        avatar={selectedItem?.avatar}
        readonly={readonly}
        placeholder={placeholder}
        onClick={openPicker}
      />

      <EntityPickerDialog
        open={open}
        onOpenChange={onOpenChange}
        title={title ?? label}
        placeholder={searchPlaceholder}
        search={search}
        onSearchChange={setSearch}
        items={items}
        loading={loading}
        selectedId={value}
        onSelect={(item) => {
          onChange(item.id)
        }}
        emptyTitle={emptyTitle}
        emptyDescription={emptyDescription}
      />
    </>
  )
}
