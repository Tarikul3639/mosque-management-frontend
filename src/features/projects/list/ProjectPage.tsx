"use client"

import { DataTable, DataTableToolbar } from "@/components/common/data-table"

import { ProjectHeader } from "./components/ProjectHeader"
import { ProjectFilters } from "./components/ProjectFilters"
import { ProjectSummaryCards } from "./components/ProjectSummaryCards"

import { projectColumns } from "./components/project-columns"

import { useProject } from "./useProject"
import { ErrorComponent } from "@/components/common/error"

export function ProjectPage() {
  const {
    projects,
    summary,
    meta,

    isLoading,
    isSummaryLoading,

    page,
    setPage,

    status,
    setStatus,

    limit,
    setLimit,

    isError,
    refetch,

    search,
    setSearch,
  } = useProject()

  if (isError) {
    return (
      <ErrorComponent
        onRetry={refetch}
        title="Error"
        error="An error occurred while fetching project data."
      />
    )
  }

  return (
    <div className="space-y-6 p-6">
      <ProjectHeader />

      <ProjectSummaryCards isLoading={isSummaryLoading} summary={summary} />

      <DataTable
        columns={projectColumns}
        initialColumnVisibility={{
          timeline: false,
        }}
        data={projects}
        isLoading={isLoading}
        isFetching={isLoading}
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
            isFiltered={!!status || !!search}
            onReset={() => {
              setSearch("")
              setStatus(undefined)
            }}
            placeholder="Search by project name, description, or location"
            filters={
              <ProjectFilters status={status} onStatusChange={setStatus} />
            }
          />
        )}
      </DataTable>
    </div>
  )
}
