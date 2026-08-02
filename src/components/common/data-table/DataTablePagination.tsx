"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps {
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
  onPageChange?: (page: number) => void
  onPageSizeChange?: (pageSize: number) => void
}

const PAGE_SIZES = [5, 10, 20, 50, 100]

function getPagination(current: number, total: number): (number | "...")[] {
  if (total <= 4) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 3) {
    return [1, 2, 3, "...", total]
  }

  if (current >= total - 2) {
    return [1, "...", total - 2, total - 1, total]
  }

  return [1, "...", current - 1, current, current + 1, "...", total]
}

export function DataTablePagination({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: DataTablePaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1

  const end = Math.min(page * pageSize, totalItems)

  const pages = getPagination(page, totalPages)

  return (
    <div className="flex flex-col gap-5 border-t border-border px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{start}</span>{" "}
          to <span className="font-semibold text-foreground">{end}</span> of{" "}
          <span className="font-semibold text-foreground">{totalItems}</span>{" "}
          entries
        </p>

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Rows per page
          </span>

          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange?.(Number(value))}
          >
            <SelectTrigger className="h-10 w-24 rounded-lg border-border bg-background shadow-xs transition-colors duration-200 hover:bg-accent hover:text-accent-foreground">
              <SelectValue />
            </SelectTrigger>

            <SelectContent className="rounded-lg">
              {PAGE_SIZES.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 self-start lg:self-auto">
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-lg transition-colors duration-200"
          disabled={page === 1}
          onClick={() => onPageChange?.(page - 1)}
        >
          <ChevronLeft className="size-4" />
        </Button>

        {pages.map((item, index) =>
          item === "..." ? (
            <Button
              key={`ellipsis-${index}`}
              variant="ghost"
              size="icon"
              disabled
              className="size-10 rounded-lg"
            >
              <MoreHorizontal className="size-4 text-muted-foreground" />
            </Button>
          ) : (
            <Button
              key={item}
              size="icon"
              variant={item === page ? "default" : "outline"}
              className={cn(
                "size-10 rounded-lg transition-all duration-200",
                item === page && "shadow-sm"
              )}
              onClick={() => onPageChange?.(item)}
            >
              {item}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-lg transition-colors duration-200"
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange?.(page + 1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
