"use client"

import { useMemo, useState } from "react"

import { useGetGalleriesQuery } from "@/store/api/gallery.api"

export function useGallery() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")

  const query = useMemo(
    () => ({
      page,
      limit,
      search,
    }),
    [page, limit, search]
  )

  const { data, isLoading, isFetching } = useGetGalleriesQuery(query)

  return {
    galleries: data?.data ?? [],
    meta: data?.meta,

    page,
    limit,
    search,

    setPage,
    setLimit,
    setSearch,

    isLoading,
    isFetching,
  }
}
