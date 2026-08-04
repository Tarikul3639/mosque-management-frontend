"use client"

import { DataTable, DataTableToolbar } from "@/components/common/data-table"
import { ErrorComponent } from "@/components/common/error"

import { getErrorMessage } from "@/utils/get-error-message"

import { CommitteeHeader } from "./components/CommitteeHeader"
import { CommitteeFilters } from "./components/CommitteeFilters"
import { CommitteeSummaryCards } from "./components/CommitteeSummaryCards"
import { committeeColumns } from "./components/committee-columns"

import { useCommittee } from "./useCommittee"

export function CommitteePage() {
  const {
    members,
    summary,
    meta,

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

    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useCommittee()

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load committee."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  return (
    <div className="space-y-6 p-6">
      <CommitteeHeader total={meta.total} />

      <CommitteeSummaryCards summary={summary} />

      <DataTable
        columns={committeeColumns}
        initialColumnVisibility={{
          name: true,
          designation: true,
          isActive: true,
          email: true, // Contact Info column
          joiningDate: true, // Tenure / Joining column
          address: false,
          endDate: false,
          createdAt: false,
          updatedAt: false,
          actions: true,
        }}
        data={members}
        isLoading={isLoading}
        isFetching={isFetching}
        // Pagination Props
        currentPage={page}
        onPageChange={setPage}
        pageSize={limit}
        onPageSizeChange={setLimit}
        totalItems={meta.total}
        totalPages={meta.totalPages}
        // Empty State Props
        emptyTitle="No committee members"
        emptyDescription="No committee member found."
      >
        {(table) => (
          <>
            <DataTableToolbar
              table={table}
              search={search}
              onSearchChange={setSearch}
              isFiltered={!!designation || isActive !== undefined || !!search}
              onReset={() => {
                setSearch("")
                setDesignation(undefined)
                setIsActive(undefined)
              }}
              placeholder="Search by name, email, or phone number"
              filters={
                <CommitteeFilters
                  designation={designation}
                  isActive={isActive}
                  onDesignationChange={setDesignation}
                  onStatusChange={setIsActive}
                />
              }
            />
          </>
        )}
      </DataTable>
    </div>
  )
}
