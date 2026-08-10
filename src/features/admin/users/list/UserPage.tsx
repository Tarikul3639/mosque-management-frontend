"use client"

import { DataTable, DataTableToolbar } from "@/components/common/data-table"

import { ErrorComponent } from "@/components/common/error"

import { UserHeader } from "./components/UserHeader"
import { UserFilters } from "./components/UserFilters"
import { UserSummaryCards } from "./components/UserSummaryCards"

import { userColumns } from "./components/user-columns"

import { useUser } from "./useUser"

export function UserPage() {
  const {
    users,
    meta,

    summary,

    isLoading,
    isFetching,
    isSummaryLoading,

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

    isError,
    refetch,
  } = useUser()

  if (isError) {
    return (
      <ErrorComponent
        title="Error"
        error="An error occurred while fetching user data."
        onRetry={refetch}
      />
    )
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <UserHeader />

      <UserSummaryCards data={summary} isLoading={isSummaryLoading} />

      <DataTable
        columns={userColumns}
        data={users}
        isLoading={isLoading}
        isFetching={isFetching}
        currentPage={page}
        totalPages={meta?.totalPages ?? 0}
        pageSize={limit}
        totalItems={meta?.total ?? 0}
        onPageChange={setPage}
        onPageSizeChange={setLimit}
      >
        {(table) => (
          <DataTableToolbar
            table={table}
            search={search}
            onSearchChange={setSearch}
            placeholder="Search by name, email or phone"
            isFiltered={!!search || !!role || !!status}
            onReset={() => {
              setSearch("")
              setRole(undefined)
              setStatus(undefined)
            }}
            filters={
              <UserFilters
                role={role}
                status={status}
                onRoleChange={setRole}
                onStatusChange={setStatus}
              />
            }
          />
        )}
      </DataTable>
    </div>
  )
}
