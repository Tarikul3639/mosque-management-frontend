"use client"

// src/features/donations/list/DonationsPage.tsx
import { useMemo, useState } from "react"
import { DateRange } from "react-day-picker"

import { DataTable } from "@/components/common/data-table"

import { DonationHeader } from "./components/DonationHeader"
import { DonationFilters } from "./components/DonationFilters"
import { DonationSummaryCards } from "./components/DonationSummaryCards"
import { donationColumns } from "./components/donation-columns"

import {
  useGetDonationsQuery,
  useGetDonationSummaryQuery,
} from "@/store/api/donation.api"
import { PaymentMethod } from "@/types/payment"

export function DonationsPage() {
  const [dateRange, setDateRange] = useState<DateRange>()

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const [search, setSearch] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"ALL" | PaymentMethod>(
    "ALL"
  )

  // Initial column visibility settings for the data table
  const initialColumnVisibility = {
    receiptNo: true,
    donor: true,
    amount: true,
    paymentMethod: false,
    donationDate: true,
    purpose: false,
    isAnonymous: false,

    createdBy: false,
    createdAt: false,
    updatedAt: false,
  }

  const fromDate = useMemo(
    () => dateRange?.from?.toISOString().split("T")[0],
    [dateRange]
  )

  const toDate = useMemo(
    () => dateRange?.to?.toISOString().split("T")[0],
    [dateRange]
  )

  const { data: summaryData, isLoading: isSummaryLoading } =
    useGetDonationSummaryQuery({})

  const { data, isLoading, isFetching } = useGetDonationsQuery({
    page,
    limit: pageSize,
    search: search || undefined,
    paymentMethod: paymentMethod !== "ALL" ? paymentMethod : undefined,
    fromDate,
    toDate,
  })

  const handleReset = () => {
    setSearch("")
    setPaymentMethod("ALL")
    setDateRange(undefined)
    setPage(1)
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <DonationHeader
        dateRange={dateRange}
        onDateRangeChange={(value) => {
          setDateRange(value)
          setPage(1)
        }}
      />

      <DonationSummaryCards
        data={
          summaryData ?? {
            totalDonations: 0,
            totalAmount: 0,
            averageAmount: 0,
          }
        }
        isLoading={isSummaryLoading}
      />

      <DataTable
        columns={donationColumns}
        data={data?.data ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        currentPage={page}
        pageSize={pageSize}
        totalItems={data?.total ?? 0}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
        initialColumnVisibility={initialColumnVisibility}
      >
        {(table) => (
          <DonationFilters
            table={table}
            search={search}
            paymentMethod={paymentMethod}
            isFiltered={
              !!search ||
              paymentMethod !== "ALL" ||
              !!dateRange?.from ||
              !!dateRange?.to
            }
            onSearchChange={(value) => {
              setSearch(value)
              setPage(1)
            }}
            onPaymentMethodChange={(value) => {
              setPaymentMethod(value as "ALL" | PaymentMethod)
              setPage(1)
            }}
            onReset={handleReset}
          />
        )}
      </DataTable>
    </div>
  )
}
