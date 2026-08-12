"use client"

import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import {
    usePathname,
    useRouter,
    useSearchParams,
} from "next/navigation"

import { Button } from "@/components/ui/button"

interface PaginationProps {
    currentPage: number
    totalPages: number
    maxVisiblePages?: number
    className?: string
}

export const Pagination = ({
    currentPage,
    totalPages,
    maxVisiblePages = 5,
    className,
}: PaginationProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    if (totalPages <= 1) {
        return null
    }

    const half = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(
        1,
        currentPage - half,
    )

    let endPage = Math.min(
        totalPages,
        startPage + maxVisiblePages - 1,
    )

    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(
            1,
            endPage - maxVisiblePages + 1,
        )
    }

    const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
    )

    const handlePageChange = (page: number) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return
        }

        const params = new URLSearchParams(
            searchParams.toString(),
        )

        params.set("page", String(page))

        router.push(
            `${pathname}?${params.toString()}`,
            {
                scroll: false,
            },
        )

        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth",
        // })
    }

    return (
        <nav
            aria-label="Pagination"
            className={`mt-10 flex items-center justify-center gap-1.5 ${className ?? ""
                }`}
        >
            {/* Previous */}
            <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() =>
                    handlePageChange(currentPage - 1)
                }
                className="gap-1.5"
            >
                <ChevronLeft className="size-4" />

                <span className="hidden sm:inline">
                    Previous
                </span>
            </Button>

            {/* First page */}
            {startPage > 1 && (
                <>
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(1)}
                        aria-label="Go to page 1"
                    >
                        1
                    </Button>

                    {startPage > 2 && (
                        <span
                            className="px-1.5 text-sm text-muted-foreground"
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    )}
                </>
            )}

            {/* Pages */}
            {pages.map((page) => (
                <Button
                    key={page}
                    type="button"
                    variant={
                        page === currentPage
                            ? "default"
                            : "outline"
                    }
                    size="icon"
                    onClick={() => handlePageChange(page)}
                    aria-current={
                        page === currentPage
                            ? "page"
                            : undefined
                    }
                    aria-label={`Go to page ${page}`}
                >
                    {page}
                </Button>
            ))}

            {/* Last page */}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && (
                        <span
                            className="px-1.5 text-sm text-muted-foreground"
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                            handlePageChange(totalPages)
                        }
                        aria-label={`Go to page ${totalPages}`}
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
                onClick={() =>
                    handlePageChange(currentPage + 1)
                }
                className="gap-1.5"
            >
                <span className="hidden sm:inline">
                    Next
                </span>

                <ChevronRight className="size-4" />
            </Button>
        </nav>
    )
}