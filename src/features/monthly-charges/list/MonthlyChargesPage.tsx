// src/features/monthly-charges/list/MonthlyChargesPage.tsx

"use client"

import { useMemo, useState } from "react"

import { ErrorComponent } from "@/components/common/error"
import { DataTable, DataTableToolbar } from "@/components/common/data-table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { getErrorMessage } from "@/utils/get-error-message"

import {
  useGenerateMonthlyChargesMutation,
  useGetMonthlyChargesQuery,
} from "@/store/api/monthly-charge.api"

import { PaymentStatus } from "@/types/payment"
import { PAYMENT_STATUS_OPTIONS } from "@/constants/payment-status"
import { MONTHS, YEARS } from "@/constants/date"

import { MonthlyChargesHeader } from "./components/MonthlyChargesHeader"
import { monthlyChargeColumns } from "./components/monthly-charge-columns"

export function MonthlyChargesPage() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [year, setYear] = useState<number>()
  const [month, setMonth] = useState<number>()
  const [status, setStatus] = useState<PaymentStatus>()
  const [activeOnly, setActiveOnly] = useState(true)

  const query = useMemo(
    () => ({
      page,
      limit,
      search: search || undefined,
      year,
      month,
      status: status ?? undefined,
      activeOnly,
    }),
    [page, limit, search, year, month, status, activeOnly]
  )

  const { data, isLoading, isFetching, isError, refetch } =
    useGetMonthlyChargesQuery(query)

  const [generateMonthlyCharges, { isLoading: isGenerating }] =
    useGenerateMonthlyChargesMutation()

  const handleGenerate = async () => {
    const now = new Date()

    await generateMonthlyCharges({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
    })
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load monthly charges."
        error={getErrorMessage(undefined)}
        onRetry={refetch}
      />
    )
  }

  return (
    <div className="space-y-6 p-6">
      <MonthlyChargesHeader
        generating={isGenerating}
        onGenerate={handleGenerate}
      />

      <DataTable
        columns={monthlyChargeColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        currentPage={data?.metadata?.page ?? 1}
        pageSize={data?.metadata?.limit ?? 10}
        totalItems={data?.metadata?.total ?? 0}
        totalPages={data?.metadata?.totalPages ?? 0}
        onPageChange={setPage}
        onPageSizeChange={(value) => {
          setLimit(value)
          setPage(1)
        }}
        initialColumnVisibility={{
          dueDate: false,
          paidAt: false,
        }}
      >
        {(table) => (
          <DataTableToolbar
            table={table}
            search={search}
            onSearchChange={setSearch}
            placeholder="Search by name or family..."
            isFiltered={!!search || !!year || !!month || !!status}
            onReset={() => {
              setSearch("")
              setYear(undefined)
              setMonth(undefined)
              setStatus(undefined)
              setActiveOnly(true)
            }}
            filters={
              <>
                {/* Status Filter */}
                <Select
                  key={status}
                  value={status}
                  onValueChange={(value) =>
                    setStatus(value as PaymentStatus | undefined)
                  }
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ALL" disabled>
                        All Statuses
                      </SelectItem>
                      {PAYMENT_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Month Filter */}
                <Select
                  key={month}
                  value={month?.toString() ?? ""}
                  onValueChange={(value) =>
                    setMonth(value ? parseInt(value) : undefined)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter by month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ALL" disabled>
                        All Months
                      </SelectItem>
                      {MONTHS.map((month) => (
                        <SelectItem
                          key={month.value}
                          value={month.value.toString()}
                        >
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Year Filter */}
                <Select
                  key={year}
                  value={year?.toString() ?? ""}
                  onValueChange={(value) =>
                    setYear(value ? parseInt(value) : undefined)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Filter by year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ALL" disabled>
                        All Years
                      </SelectItem>
                      {YEARS.map((year) => (
                        <SelectItem
                          key={year.value}
                          value={year.value.toString()}
                        >
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </>
            }
          />
        )}
      </DataTable>
    </div>
  )
}
