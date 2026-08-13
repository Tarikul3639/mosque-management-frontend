"use client"

import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

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

import { PROJECT_STATUS_OPTIONS } from "../constants"

interface ProjectToolbarProps {
  currentSearch?: string
  currentStatus?: "PLANNING" | "RUNNING" | "COMPLETED" | "CANCELLED"
}

export function ProjectToolbar({
  currentSearch = "",
  currentStatus,
}: ProjectToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(currentSearch)

  useEffect(() => {
    setSearch(currentSearch)
  }, [currentSearch])

  const hasFilters = Boolean(search.trim()) || Boolean(currentStatus)

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    // Filter change → first page
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

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearch()
    }
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearch(value)

    // Native search clear button
    if (!value) {
      updateQuery("search", "")
    }
  }

  const handleClearFilters = () => {
    setSearch("")

    const params = new URLSearchParams(searchParams.toString())

    params.delete("search")
    params.delete("status")
    params.delete("page")

    const queryString = params.toString()

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    })
  }

  return (
    <section className="relative z-20 -mt-8 mb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />

              <Input
                type="search"
                value={search}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                placeholder="প্রকল্প খুঁজুন..."
                className="h-10 pl-9"
              />
            </div>

            {/* Filters */}
            <div className="flex w-full flex-row gap-3 sm:w-auto">
              {/* Status */}
              <Select
                value={currentStatus ?? "all"}
                onValueChange={(value) =>
                  updateQuery("status", value === "all" ? "" : value)
                }
              >
                <SelectTrigger className="h-10 w-38">
                  <SelectValue placeholder="অবস্থা নির্বাচন করুন" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>প্রকল্পের অবস্থা</SelectLabel>

                    <SelectSeparator />

                    <SelectItem value="all">সকল প্রকল্প</SelectItem>

                    {PROJECT_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Clear */}
              <Button
                type="button"
                variant="destructive"
                onClick={handleClearFilters}
                disabled={!hasFilters}
              >
                <X className="size-4" strokeWidth={2.5} />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
