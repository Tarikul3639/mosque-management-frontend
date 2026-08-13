"use client"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { EXPENSE_CATEGORY_OPTIONS } from "../constants"

import type { ExpenseCategory } from "@/types/expense"

interface ExpenseToolbarProps {
  currentSearch?: string
  currentCategory?: ExpenseCategory
}

export function ExpenseToolbar({
  currentSearch = "",
  currentCategory,
}: ExpenseToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(currentSearch)

  const hasFilters = Boolean(search.trim()) || Boolean(currentCategory)

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("page")

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    const queryString = params.toString()

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    })
  }

  const handleSearch = () => {
    updateQuery("search", search.trim())
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearch(value)

    if (!value) {
      updateQuery("search", "")
    }
  }

  const handleClearFilters = () => {
    setSearch("")

    router.replace(pathname, {
      scroll: false,
    })
  }

  return (
    <section className="relative z-20 -mt-8 mb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                type="search"
                value={search}
                placeholder="ব্যয় খুঁজুন..."
                className="h-10 pl-9"
                onChange={handleSearchChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch()
                  }
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Category */}
              <Select
                value={currentCategory ?? "all"}
                onValueChange={(value) =>
                  updateQuery("category", value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="h-10 w-full max-w-64 lg:w-42">
                  <SelectValue placeholder="খাত নির্বাচন করুন" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>ব্যয়ের খাত</SelectLabel>

                    <SelectSeparator />

                    <SelectItem value="all">সকল খাত</SelectItem>

                    {EXPENSE_CATEGORY_OPTIONS.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Clear */}
              <Button
                type="button"
                variant="destructive"
                disabled={!hasFilters}
                onClick={handleClearFilters}
              >
                <X className="size-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
