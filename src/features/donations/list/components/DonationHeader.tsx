"use client"

// src/features/donations/list/components/DonationHeader.tsx
import Link from "next/link"
import { Plus } from "lucide-react"
import { DateRange } from "react-day-picker"
import { ROUTES } from "@/config/routes"

import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"

interface DonationHeaderProps {
  dateRange?: DateRange
  onDateRangeChange: (value: DateRange | undefined) => void
}

export function DonationHeader({
  dateRange,
  onDateRangeChange,
}: DonationHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1 className="text-3xl font-bold tracking-tight">Donations</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage and track all mosque donations.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 lg:justify-end">
        <DatePickerWithRange
          value={dateRange}
          onChange={onDateRangeChange}
          className="h-10 w-72"
          placeholder="Select donation date range"
          numberOfMonths={2}
        />

        <Button asChild>
          <Link href={ROUTES.ADMIN.DONATIONS.CREATE} className="py-4.5">
            <Plus className="h-4 w-4" />
            Add Donation
          </Link>
        </Button>
      </div>
    </div>
  )
}
