"use client"

import { useMemo, useState } from "react"
import type { UserRole, UserStatus } from "@/types/user"
import type { UserQuery } from "@/types/user"

import { useGetUsersQuery, useGetUserSummaryQuery } from "@/store/api/user.api"

export function useUser() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [role, setRole] = useState<UserRole>()
  const [status, setStatus] = useState<UserStatus>()

  const query = useMemo(
    () =>
      ({
        page,
        limit,
        search,
        role,
        status,
      }) satisfies UserQuery,
    [page, limit, search, role, status]
  )

  const {
    data: usersData,

    isLoading,
    isFetching,

    isError,
    refetch,
  } = useGetUsersQuery(query)

  const {
    data: summary,

    isLoading: isSummaryLoading,
  } = useGetUserSummaryQuery()

  return {
    users: usersData?.data ?? [],

    meta: usersData?.meta,

    summary,

    isSummaryLoading,

    isLoading,
    isFetching,

    isError,
    refetch,

    page,
    setPage,

    limit,
    setLimit,

    search,
    setSearch,

    role,
    setRole,

    status,
    setStatus,
  }
}
