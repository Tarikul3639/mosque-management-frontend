"use client"

import { useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

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

interface FamilyToolbarProps {
    currentSearch: string
    currentLimit: number
}

export const FamilyToolbar = ({
    currentSearch,
    currentLimit,
}: FamilyToolbarProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(currentSearch)

    // Sync input with URL/server state
    useEffect(() => {
        setQuery(currentSearch)
    }, [currentSearch])

    // Search
    useEffect(() => {
        const search = query.trim()

        if (search === currentSearch) {
            return
        }

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (search) {
                params.set("search", search)
            } else {
                params.delete("search")
            }

            params.set("page", "1")

            router.push(`${pathname}?${params.toString()}`, {
                scroll: false,
            })
        }, 300)

        return () => clearTimeout(timer)
    }, [
        query,
        currentSearch,
        pathname,
        router,
        searchParams,
    ])

    // Change page limit
    const handleLimitChange = (newLimit: string) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("limit", newLimit)
        params.set("page", "1")

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        })
    }

    return (
        <div className="relative z-10 mx-auto -mt-8 max-w-7xl px-4">
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    {/* Search */}
                    <div className="relative min-w-0 flex-1">
                        <Search
                            className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground"
                            aria-hidden="true"
                        />

                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="পরিবারের নাম বা নম্বর দিয়ে খুঁজুন..."
                            className="h-10 pr-9 pl-9"
                        />

                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery("")}
                                aria-label="Clear search"
                                className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                                <X className="size-3.5" />
                            </button>
                        )}
                    </div>

                    {/* Page limit */}
                    <div className="flex justify-between shrink-0 items-center gap-2">
                        <span className="whitespace-nowrap text-sm text-muted-foreground">
                            প্রতি পৃষ্ঠায়
                        </span>

                        <Select
                            value={String(currentLimit)}
                            onValueChange={handleLimitChange}
                        >
                            <SelectTrigger className="h-9 w-20">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectGroup>
                                <SelectContent className="p-1.5">
                                    <SelectLabel>প্রতি পৃষ্ঠায়</SelectLabel>
                                    <SelectSeparator />
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </SelectGroup>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}