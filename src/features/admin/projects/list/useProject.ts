"use client"

import { useMemo, useState } from "react"

import type { ProjectStatus } from "@/constants/project-status"
import type { ProjectQuery } from "@/types/project"
import {
  useGetProjectsQuery,
  useGetProjectSummaryQuery,
} from "@/store/api/project.api"

export function useProject() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<ProjectStatus | undefined>()

  const query = useMemo(
    () =>
      ({
        page,
        limit,
        status,
        search,
      }) satisfies ProjectQuery,
    [page, limit, status, search]
  )

  const {
    data: projectsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProjectsQuery(query)

  const { data: summaryData, isLoading: isSummaryLoading } =
    useGetProjectSummaryQuery()

  return {
    projects: projectsData?.data ?? [],
    meta: projectsData?.meta,
    summary: summaryData,
    isSummaryLoading,
    isLoading,
    isFetching,
    isError,
    refetch,

    page,
    setPage,

    limit,
    setLimit,

    status,
    setStatus,

    search,
    setSearch,
  }
}
