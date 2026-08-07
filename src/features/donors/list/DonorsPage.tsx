"use client"

import { useState, useMemo } from "react"

import { DonorsHeader } from "./components/DonorsHeader"
import { donorColumns } from "./components/donor-columns"
import { DataTable, DataTableToolbar } from "@/components/common/data-table"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useGetDonorsQuery } from "@/store/api/donor.api"

export function DonorsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"active" | "inactive">()
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
      isActive: status ? status === "active" : undefined,
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
          <DataTableToolbar
            table={table}
            search={search}
            onSearchChange={setSearch}
            isFiltered={!!search || !!status}
            placeholder="Search donors..."
            onReset={() => {
              setSearch("")
              setStatus(undefined)
            }}
            filters={
              <Select
                key={status}
                value={status}
                onValueChange={(value) =>
                  setStatus(value as "active" | "inactive")
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="" disabled>
                    Select Status
                  </SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            }
          />
        )}
      </DataTable>
    </div>
  )
}
