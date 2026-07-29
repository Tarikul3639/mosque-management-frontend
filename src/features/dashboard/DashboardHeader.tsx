"use client";

import { Bell, Download } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";

interface DashboardHeaderProps {
  userName?: string;
  subtitle?: string;
  dateRange?: DateRange;
  onDateRangeChange: (value: DateRange | undefined) => void;
  onExportReport?: () => void;
  onNotificationsClick?: () => void;
  notificationCount?: number;
}

export function DashboardHeader({
  userName = "Tarikul Islam",
  subtitle = "Here's what's happening in your mosque today.",
  dateRange,
  onDateRangeChange,
  onExportReport,
  onNotificationsClick,
  notificationCount = 5,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-5 px-2 py-5 lg:flex-row lg:items-center lg:justify-between">
      {/* Left */}
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-semibold text-foreground">
          Welcome back, {userName}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {subtitle}
        </p>
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
          variant="outline"
          size="lg"
          onClick={onNotificationsClick}
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="size-4" />

          {notificationCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[11px] font-semibold text-destructive-foreground">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Button>

        <Button
          type="button"
          onClick={onExportReport}
          className="gap-2"
          size="lg"
        >
          <Download className="size-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
}