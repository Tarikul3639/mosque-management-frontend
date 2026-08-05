"use client"

import Link from "next/link"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"

import { MONTHS, YEARS } from "@/constants/date"

interface PaymentHeaderProps {
  month?: number
  setMonth: (month?: number) => void
  year?: number
  setYear: (year?: number) => void
  fromDate?: string
  setFromDate: (fromDate?: string) => void
  toDate?: string
  setToDate: (toDate?: string) => void
}

export function PaymentHeader({
  month,
  setMonth,
  year,
  setYear,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: PaymentHeaderProps) {
  // Convert fromDate and toDate strings to Date objects for the date picker
  const dateRange =
    fromDate && toDate
      ? { from: new Date(fromDate), to: new Date(toDate) }
      : undefined
  // Handle date range change and update fromDate and toDate state
  const handleDateRangeChange = (
    value: { from?: Date; to?: Date } | undefined
  ) => {
    setFromDate(value?.from ? value.from.toISOString() : undefined)
    setToDate(value?.to ? value.to.toISOString() : undefined)
  }

  const isFiltered = Boolean(month || year || fromDate || toDate)

  return (
    <PageHeader
      title="Payments"
      description="Manage, track and monitor all family payments."
      icon={<CreditCard className="size-6" />}
      actions={
        <>
          {/* Month Filter */}
          <Select
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
                  <SelectItem key={month.value} value={month.value.toString()}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Year Filter */}
          <Select
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
                  <SelectItem key={year.value} value={year.value.toString()}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <DatePickerWithRange
            value={dateRange}
            onChange={handleDateRangeChange}
            placeholder="Filter by date range"
          />

          {/* Reset Filters Button */}
          {isFiltered && (
            <Button
              variant="destructive"
              onClick={() => {
                setMonth(undefined)
                setYear(undefined)
                setFromDate(undefined)
                setToDate(undefined)
              }}
            >
              Reset Filters
            </Button>
          )}

          {/* Create Payment Button */}
          <Button asChild>
            <Link href="/payments/create">Create Payment</Link>
          </Button>
        </>
      }
    />
  )
}
