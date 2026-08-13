"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PaginationProps {
  currentPage: number
  totalPages: number
  maxVisiblePages?: number
  className?: string

  showLimitSelector?: boolean
  limit?: number
  limitOptions?: number[]
}

export function Pagination({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
  className,
  showLimitSelector = false,
  limit = 10,
  limitOptions = [6, 9, 12, 24, 48],
}: PaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // if (totalPages <= 1) {
  //   return null
  // }

  const half = Math.floor(maxVisiblePages / 2)

  let startPage = Math.max(1, currentPage - half)
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  const pages = Array.from(
    {
      length: endPage - startPage + 1,
    },
    (_, index) => startPage + index
  )

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return
    }

    const params = new URLSearchParams(searchParams.toString())

    params.set("page", String(page))

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set("limit", value)
    params.set("page", "1")

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  return (
    <div
      className={`mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between ${
        className ?? ""
      }`}
    >
      {/* Limit */}
      {showLimitSelector && (
        <div className="flex items-center gap-3">
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            প্রতি পৃষ্ঠা
          </span>

          <Select value={String(limit)} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {limitOptions.map((item) => (
                <SelectItem key={item} value={String(item)}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Pagination */}
      <nav
        aria-label="Pagination"
        className="flex flex-wrap items-center justify-center gap-1.5 md:justify-end"
      >
        {/* Previous */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="gap-1.5"
        >
          <ChevronLeft className="size-4" />

          <span className="hidden sm:inline">Previous</span>
        </Button>

        {/* First */}
        {startPage > 1 && (
          <>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(1)}
            >
              1
            </Button>

            {startPage > 2 && (
              <span className="px-1.5 text-sm text-muted-foreground">...</span>
            )}
          </>
        )}

        {/* Pages */}
        {pages.map((page) => (
          <Button
            key={page}
            type="button"
            variant={page === currentPage ? "default" : "outline"}
            size="icon"
            onClick={() => handlePageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </Button>
        ))}

        {/* Last */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-1.5 text-sm text-muted-foreground">...</span>
            )}

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </Button>
          </>
        )}

        {/* Next */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="gap-1.5"
        >
          <span className="hidden sm:inline">Next</span>

          <ChevronRight className="size-4" />
        </Button>
      </nav>
    </div>
  )
}
