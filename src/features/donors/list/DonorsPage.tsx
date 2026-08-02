"use client"

import { useState, useMemo } from "react"

import { DonorsHeader } from "./components/DonorsHeader"
import { DonorFilters } from "./components/DonorFilters"
import { donorColumns } from "./components/donor-columns"
import { DataTable } from "@/components/common/data-table"

import { useGetDonorsQuery } from "@/store/api/donor.api"

export function DonorsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"all" | "active" | "inactive">("all")
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)

  // Initial column visibility settings for the data table
  const initialColumnVisibility = {
    avatar: true,
    name: true,
    email: true,
    phone: true,
    address: false,
    isActive: true,
    createdAt: false,
    updatedAt: false,
  }

  const query = useMemo(
    () => ({
      page,
      limit: pageSize,
      search,
      isActive: status === "all" ? undefined : status === "active",
    }),
    [page, pageSize, search, status]
  )

  const { data: donors, isLoading, isFetching } = useGetDonorsQuery(query)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <DonorsHeader totalDonors={donors?.total || 0} />

      {/* Data Table */}
      <DataTable
        columns={donorColumns}
        data={donors?.data || []}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle="No donors found"
        emptyDescription="There are no donors to display."
        rowKey={(row) => row.id}
        currentPage={page}
        pageSize={pageSize}
        totalItems={donors?.total ?? 0}
        totalPages={donors?.totalPages ?? 1}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
        initialColumnVisibility={initialColumnVisibility}
      >
        {(table) => (
          <DonorFilters
            table={table}
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
          />
        )}
      </DataTable>
    </div>
  )
}
