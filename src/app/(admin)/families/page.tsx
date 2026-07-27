"use client"

import { useEffect, useMemo, useState } from "react"

import { Card, CardContent } from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  DataTable,
  DataTablePagination,
  DataTableToolbar,
} from "@/components/tables"

import { getErrorMessage } from "@/utils/get-error-message"
import { ErrorComponent } from "@/components/common/error"

import { familyColumns } from "./components/family-columns"
import { FamiliesHeader } from "./components/FamiliesHeader"
import { FamilyStatsSection } from "./components/FamilyStatsSection"

import {
  type Family,
  useGetFamiliesQuery,
  useGetFamilyStatsQuery,
} from "@/store/api/family.api"

type FamilyStatusFilter = "all" | "active" | "inactive"

const EMPTY_STATS = {
  totalFamilies: 0,
  activeFamilies: 0,
  inactiveFamilies: 0,
  newFamiliesThisMonth: 0,
}

export default function FamiliesPage() {
  const [page, setPage] = useState(1)

  const [pageSize, setPageSize] = useState(10)

  const [searchInput, setSearchInput] = useState("")

  const [search, setSearch] = useState("")

  const [status, setStatus] = useState<FamilyStatusFilter>("all")

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput)
      setPage(1)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchInput])

  const query = useMemo(
    () => ({
      page,
      limit: pageSize,
      search,
      isActive: status === "all" ? undefined : status === "active",
    }),
    [page, pageSize, search, status]
  )

  const { data, isLoading, isFetching, isError, error, refetch } =
    useGetFamiliesQuery(query)

  const { data: statsData, isLoading: isStatsLoading } =
    useGetFamilyStatsQuery()

  const resetFilters = () => {
    setSearchInput("")
    setSearch("")
    setStatus("all")
    setPage(1)
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load families."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  return (
    <div className="space-y-6 p-6">
      <section>
        <FamiliesHeader />
      </section>

      <section>
        <FamilyStatsSection
          familyStats={statsData ?? EMPTY_STATS}
          isLoading={isStatsLoading}
        />
      </section>

      <section>
        <Card className="border-0 p-6 pb-0 shadow-none">
          <CardContent className="flex flex-1 flex-col p-0">
            <DataTable<Family>
              columns={familyColumns}
              data={data?.data ?? []}
              rowKey={(row) => row.id}
              emptyMessage="No families found."
              isLoading={isLoading}
              isFetching={isFetching}
            >
              {(table) => (
                <DataTableToolbar<Family>
                  table={table}
                  search={searchInput}
                  onSearchChange={setSearchInput}
                  placeholder="Search by family no, head name or phone..."
                  isFiltered={search.length > 0 || status !== "all"}
                  onReset={resetFilters}
                  filters={
                    <Select
                      value={status}
                      onValueChange={(value) => {
                        setStatus(value as FamilyStatusFilter)
                        setPage(1)
                      }}
                    >
                      <SelectTrigger className="h-12! w-40 rounded shadow-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>

                      <SelectContent className="rounded-lg border-border">
                        <SelectItem value="all">All Status</SelectItem>

                        <SelectItem value="active">Active</SelectItem>

                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  }
                />
              )}
            </DataTable>

            <DataTablePagination
              page={page}
              pageSize={pageSize}
              totalPages={data?.totalPages ?? 1}
              totalItems={data?.total ?? 0}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size)
                setPage(1)
              }}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
