// src/components/common/data-table/DataTableToolbar.tsx
"use client"

import { type ReactNode } from "react"
import { type Table } from "@tanstack/react-table"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableColumnVisibility } from "./DataTableColumnVisibility"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  search: string
  onSearchChange: (value: string) => void
  onReset?: () => void
  filters?: ReactNode
  actions?: ReactNode
  placeholder?: string
  isFiltered?: boolean
}

export function DataTableToolbar<TData>({
  table,
  search,
  onSearchChange,
  onReset,
  filters,
  actions,
  placeholder = "Search...",
  isFiltered = false,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Search — own row on mobile, inline on desktop */}
      <div className="relative w-full flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-md border-border bg-muted/40 pr-4 pl-11 shadow-xs transition-all duration-200 hover:border-border hover:bg-background focus-visible:bg-background focus-visible:shadow-sm"
        />
      </div>

      {/* Everything else — second row on mobile, rest of the row on desktop */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: filters + reset */}
        <div className="flex flex-wrap items-center gap-3">
          {filters}

          {isFiltered && onReset && (
            <Button
              variant="destructive"
              size="default"
              onClick={onReset}
              className="h-9! shrink-0 rounded-full px-3"
            >
              <X className="size-4" />
              Reset
            </Button>
          )}
        </div>

        {/* Right: view options + actions */}
        <div className="flex flex-wrap items-center gap-2">
          <DataTableColumnVisibility table={table} />
          {actions}
        </div>
      </div>
    </div>
  )
}
