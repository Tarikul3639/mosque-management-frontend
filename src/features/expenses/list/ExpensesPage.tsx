// src/features/expenses/list/ExpensesPage.tsx

"use client"

import { useMemo, useState } from "react"

import { ErrorComponent } from "@/components/common/error"
import { PageLoader } from "@/components/common/page-loader"
import { DataTable, DataTableToolbar } from "@/components/common/data-table"

import {
  useGetExpensesQuery,
  useGetExpenseSummaryQuery,
} from "@/store/api/expense.api"

import { ExpenseHeader } from "./components/ExpenseHeader"
import { ExpenseSummaryCards } from "./components/ExpenseSummaryCards"
import { expenseColumns } from "./components/expense-columns"
import { ExpenseCategory, ExpenseQuery } from "@/types/expense"
import { EXPENSE_CATEGORY_OPTIONS_WITH_ALL } from "@/constants/expense-categories"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ExpensesPage() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<ExpenseCategory | "ALL">("ALL")

  const initialColumnVisibility = {
    category: true,
    title: true,
    amount: true,
    expenseDate: true,
    createdBy: true,
    updatedBy: true,
    date: true,
    note: false,
    createdAt: false,
    updatedAt: false,
  }

  // Memoize the query object to avoid unnecessary re-renders
  const query = useMemo(
    () =>
      ({
        page,
        limit,
        search: search.trim() || undefined,
        category: category === "ALL" ? undefined : category,
      }) satisfies ExpenseQuery,
    [page, limit, search, category]
  )

  // Fetch expenses data based on the query
  const {
    data: expense,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetExpensesQuery(query)

  // Fetch expense summary data
  const { data: summary, isLoading: isSummaryLoading } =
    useGetExpenseSummaryQuery()

  if (isLoading && !expense) {
    return <PageLoader />
  }

  if (isError) {
    return <ErrorComponent onRetry={refetch} />
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <ExpenseHeader />

      <ExpenseSummaryCards summary={summary} isLoading={isSummaryLoading} />

      <DataTable
        columns={expenseColumns}
        initialColumnVisibility={initialColumnVisibility}
        data={expense?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        emptyTitle="No expenses found"
        emptyDescription="There are no expenses to display."
        rowKey={(row) => row.id}
        totalPages={expense?.meta.totalPages ?? 0}
        currentPage={page}
        pageSize={limit}
        totalItems={expense?.meta.total ?? 0}
        onPageChange={setPage}
        onPageSizeChange={setLimit}
      >
        {(table) => (
          <DataTableToolbar
            table={table}
            search={search}
            onSearchChange={setSearch}
            isFiltered={!!search || category !== "ALL"}
            onReset={() => {
              setSearch("")
              setCategory("ALL")
            }}
            placeholder="Search expenses..."
            filters={
              <div className="flex flex-wrap items-center gap-2">
                {/* Category Filter */}
                <Select
                  key={category}
                  value={category}
                  onValueChange={(value) =>
                    setCategory(value as ExpenseCategory | "ALL")
                  }
                >
                  {/* Added SelectTrigger to display the selected value */}
                  <SelectTrigger className="w-45">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  {/* Added SelectContent wrapper */}
                  <SelectContent>
                    {EXPENSE_CATEGORY_OPTIONS_WITH_ALL.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            }
          />
        )}
      </DataTable>
    </div>
  )
}
