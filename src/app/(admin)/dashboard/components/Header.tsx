"use client"

import { Bell, Download } from "lucide-react"
import { DateRange } from "react-day-picker"
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"

interface DashboardHeaderProps {
  userName?: string
  subtitle?: string
  dateRange?: DateRange
  onDateRangeChange: (value: DateRange | undefined) => void
  onExportReport?: () => void
  onNotificationsClick?: () => void
  notificationCount?: number
}

export function Header({
  userName = "Tarikul Islam",
  subtitle = "Here's what's happening in your mosque today.",
  dateRange,
  onDateRangeChange,
  onExportReport,
  onNotificationsClick,
  notificationCount = 5,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 px-2 py-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="line-clamp-1 flex flex-wrap items-center gap-2 text-xl font-semibold text-foreground">
          <span className="truncate">Welcome back, {userName} 👋</span>
        </h1>

        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center justify-start gap-3 lg:justify-end">
        <DatePickerWithRange
          value={dateRange}
          onChange={onDateRangeChange}
          className="h-9 w-70"
          placeholder="Select date range"
          numberOfMonths={2}
        />

        <button
          type="button"
          onClick={onNotificationsClick}
          aria-label="Notifications"
          className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card hover:bg-secondary"
        >
          <Bell size={18} />

          {notificationCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-semibold text-white">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onExportReport}
          className="flex h-9 shrink-0 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>
    </div>
  )
}

export default Header
