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
    summary: data?.summary ?? {
      totalMembers: 0,
      activeMembers: 0,
      inactiveMembers: 0,
      presidents: 0,
      vicePresidents: 0,
      secretaries: 0,
      assistantSecretaries: 0,
      treasurers: 0,
      imams: 0,
      muazzins: 0,
      members: 0,
    },
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
