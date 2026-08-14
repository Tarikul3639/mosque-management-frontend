"use client"

import { Printer, X } from "lucide-react"
import { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"

interface DashboardHeaderProps {
  userName?: string
  subtitle?: string
  dateRange?: DateRange
  isFiltered?: boolean
  onDateRangeChange: (value: DateRange | undefined) => void
  onClear?: () => void
  onPrint?: () => void
}

export function DashboardHeader({
  userName = "Tarikul Islam",
  subtitle = "Here's what's happening in your mosque today.",
  dateRange,
  isFiltered,
  onDateRangeChange,
  onClear,
  onPrint = () => window.print(),
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-5 px-2 py-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold text-foreground">
          Welcome back, {userName}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center gap-3 lg:justify-end">
        <DatePickerWithRange
          value={dateRange}
          onChange={onDateRangeChange}
          className="h-9 w-70"
          placeholder="Select date range"
          numberOfMonths={2}
        />

        <Button
          type="button"
          variant="destructive"
          size="lg"
          disabled={!isFiltered}
          onClick={onClear}
        >
          <X className="size-4" />
          Clear
        </Button>

        <Button type="button" size="lg" onClick={onPrint} className="gap-2">
          <Printer className="size-4" />
          Print
        </Button>
      </div>
    </div>
  )
}
