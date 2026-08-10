"use client"

import { useState } from "react"
import type { Designation } from "@/constants/designation"
import { useGetCommitteeMembersQuery } from "@/store/api/committee.api"

// src/app/.../useCommittee.ts

export function useCommittee() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const [designation, setDesignation] = useState<Designation | undefined>()
  const [isActive, setIsActive] = useState<boolean | undefined>()

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetCommitteeMembersQuery({
      page,
      limit,
      search,
      designation,
      isActive,
    })

  return {
    members: data?.data ?? [],
    summary: data?.summary ?? null,
    meta: data?.meta ?? {
      total: 0,
      totalPages: 1,
      page: 1,
      limit: 20,
    },

    isLoading,
    isFetching,
    isError,
    error,
    refetch,

    page,
    setPage,
    limit,
    setLimit,

    search,
    designation,
    isActive,

    setSearch,
    setDesignation,
    setIsActive,
  }
}
