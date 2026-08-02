"use client"

import { RotateCcw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FamilyQuery } from "@/types/family"

type FamilyStatusFilter = "all" | "active" | "inactive"

interface FamilyTableToolbarProps {
  search: string
  onSearchChange: (value: string) => void

  status: FamilyStatusFilter
  onStatusChange: (value: FamilyStatusFilter) => void

  sortBy: NonNullable<FamilyQuery["sortBy"]>
  onSortByChange: (value: NonNullable<FamilyQuery["sortBy"]>) => void

  sortOrder: NonNullable<FamilyQuery["sortOrder"]>
  onSortOrderChange: (value: NonNullable<FamilyQuery["sortOrder"]>) => void

  onReset: () => void
}

export function FamilyTableToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  onReset,
}: FamilyTableToolbarProps) {
  const hasFilters =
    search.trim() !== "" ||
    status !== "all" ||
    sortBy !== "createdAt" ||
    sortOrder !== "desc"

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            placeholder="Search by family no, head name, phone..."
            className="pl-9"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Select
            value={status}
            onValueChange={(value) =>
              onStatusChange(value as FamilyStatusFilter)
            }
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>

              <SelectItem value="active">Active</SelectItem>

              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortBy}
            onValueChange={(value) =>
              onSortByChange(value as NonNullable<FamilyQuery["sortBy"]>)
            }
          >
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="createdAt">Newest</SelectItem>

              <SelectItem value="updatedAt">Recently Updated</SelectItem>

              <SelectItem value="familyNo">Family No</SelectItem>

              <SelectItem value="headName">Head Name</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(value) =>
              onSortOrderChange(value as NonNullable<FamilyQuery["sortOrder"]>)
            }
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>

              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={onReset} disabled={!hasFilters}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
