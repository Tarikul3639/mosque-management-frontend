"use client"

import { useMemo, useState } from "react"

import { DataTable, DataTableToolbar } from "@/components/common/data-table"

import { PaymentHeader } from "./components/PaymentHeader"
import { PaymentSummaryCards } from "./components/PaymentSummaryCards"
import { paymentColumns } from "./components/payment-columns"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { PAYMENT_METHOD_OPTIONS } from "@/constants/payment-methods"
import { PAYMENT_STATUS_OPTIONS } from "@/constants/payment-status"

import {
  useGetPaymentsQuery,
  useGetPaymentSummaryQuery,
} from "@/store/api/payment.api"
import {
  PaymentStatus,
  PaymentMethod,
  PaymentSummaryQueryParams,
  PaymentQueryParams,
} from "@/types/payment"

export function PaymentsPage() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")
  const [year, setYear] = useState<number>()
  const [month, setMonth] = useState<number>()
  const [status, setStatus] = useState<PaymentStatus>()
  const [method, setMethod] = useState<PaymentMethod>()
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()

  const query = useMemo(
    () =>
      ({
        page,
        limit,
        search: search || undefined,
        year,
        month,
        status,
        method,
        fromDate,
        toDate,
      }) satisfies Partial<PaymentQueryParams>,
    [page, limit, search, year, month, status, method, fromDate, toDate]
  )

  const { data, isLoading, isFetching } = useGetPaymentsQuery(query)

  const queryOfSummary = useMemo(
    () =>
      ({
        year: year || undefined,
        month: month || undefined,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
      }) satisfies Partial<PaymentSummaryQueryParams>,
    [year, month, fromDate, toDate]
  )

  const { data: summaryData, isLoading: isSummaryLoading } =
    useGetPaymentSummaryQuery(queryOfSummary)

  // Filter reset function
  const handleReset = () => {
    setSearch("")
    setStatus(undefined)
    setMethod(undefined)
    setPage(1)
  }

  const isFiltered = Boolean(search || status || method)

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <PaymentHeader
        month={month}
        setMonth={setMonth}
        year={year}
        setYear={setYear}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <PaymentSummaryCards
        data={
          summaryData ?? {
            totalFamilies: 0,
            totalCharges: 0,
            paidCharges: 0,
            partialCharges: 0,
            dueCharges: 0,
            totalChargeAmount: 0,
            totalPaidAmount: 0,
            totalDueAmount: 0,
            totalPayments: 0,
            averagePayment: 0,
          }
        }
        isLoading={isSummaryLoading}
      />

      <DataTable
        columns={paymentColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        currentPage={page}
        pageSize={limit}
        totalItems={data?.meta?.total ?? 0}
        totalPages={data?.meta?.totalPages ?? 1}
        onPageChange={setPage}
        onPageSizeChange={(value) => {
          setLimit(value)
          setPage(1)
        }}
        initialColumnVisibility={{
          id: false,
          familyId: false,
          monthlyChargeId: false,
          year: false,
          paidAmount: false,
          reference: false,
          note: false,
          createdAt: false,
          updatedAt: false,
          createdBy: false,
          updatedBy: false,
        }}
      >
        {(table) => (
          <DataTableToolbar
            table={table}
            search={search}
            onSearchChange={(val) => {
              setSearch(val)
              setPage(1)
            }}
            placeholder="Search by name, family, or reference..."
            isFiltered={isFiltered}
            onReset={handleReset}
            filters={
              <>
                {/* Status Filter */}
                <Select
                  key={status ?? "ALL"}
                  value={status ?? "ALL"}
                  onValueChange={(value) =>
                    setStatus(
                      value === "ALL" ? undefined : (value as PaymentStatus)
                    )
                  }
                >
                  <SelectTrigger className="h-9 w-40">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL" disabled>
                      All Status
                    </SelectItem>
                    {PAYMENT_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Payment Method Filter */}
                <Select
                  key={method ?? "ALL"}
                  value={method ?? "ALL"}
                  onValueChange={(value) =>
                    setMethod(
                      value === "ALL" ? undefined : (value as PaymentMethod)
                    )
                  }
                >
                  <SelectTrigger className="h-9 w-44">
                    <SelectValue placeholder="All Methods" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL" disabled>
                      All Methods
                    </SelectItem>
                    {PAYMENT_METHOD_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
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
