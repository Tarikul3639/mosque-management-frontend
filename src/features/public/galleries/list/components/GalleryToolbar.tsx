"use client"

import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { Input } from "@/components/ui/input"

interface GalleryToolbarProps {
  currentSearch?: string
  total?: number
}

export function GalleryToolbar({
  currentSearch = "",
  total,
}: GalleryToolbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(currentSearch)

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete("page")

    if (value.trim()) {
      params.set("search", value.trim())
    } else {
      params.delete("search")
    }

    const query = params.toString()

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    })
  }

  const clearSearch = () => {
    setSearch("")
    updateQuery("")
  }

  return (
    <section className="relative z-20 -mt-10 mb-10">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            type="search"
            value={search}
            placeholder="গ্যালারি খুঁজুন..."
            className="h-14 rounded-full border-0 bg-background pr-7 pl-14 text-base shadow-xl"
            onChange={(event) => {
              const value = event.target.value

              setSearch(value)

              if (!value) {
                updateQuery("")
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                updateQuery(search)

                // Mobile keyboard hide
                event.currentTarget.blur()
              }
            }}
          />
        </div>

        {/* Result Info */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 px-2">
          <p className="text-sm text-muted-foreground">
            {search ? (
              <>
                <span className="font-medium text-foreground">"{search}"</span>{" "}
                এর ফলাফল
              </>
            ) : (
              "সকল গ্যালারি"
            )}
          </p>

          {typeof total === "number" && (
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              {total} টি গ্যালারি
            </span>
          )}
        </div>
      </div>
    </section>
  )
}
