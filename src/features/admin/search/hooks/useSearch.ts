"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { useDebouncedSearch } from "./useDebouncedSearch"
import { useCommandShortcut } from "./useCommandShortcut"

import { groupResults } from "../utils/group-results"

import { useLazyGlobalSearchQuery } from "@/store/api/search.api"
import type { SearchResult } from "@/types/search"

export function useSearch() {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  const debouncedQuery = useDebouncedSearch(query, 300)

  const [search, { data = [], isLoading, isFetching, isError, reset }] =
    useLazyGlobalSearchQuery()

  useCommandShortcut({
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
  })

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      reset()
      return
    }

    search(debouncedQuery)
  }, [debouncedQuery, reset, search])

  function handleSelect(item: SearchResult) {
    setOpen(false)
    setQuery("")
    router.push(item.url)
  }

  return {
    open,
    setOpen,

    query,
    setQuery,

    groupedResults: groupResults(data),

    isLoading: isLoading || isFetching,
    isFetching,
    isError,

    refetch: () => search(debouncedQuery),

    handleSelect,
  }
}
