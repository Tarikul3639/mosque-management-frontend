"use client";

import { DateRange } from "react-day-picker";
import Header from "./components/Header";
import { useState } from "react";
import { StatsSection } from "./components/stats/StatsSection";

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  return (
    <div className="flex flex-col gap-6 px-4">
      <Header
        userName="Tarikul Islam"
        subtitle="Here's what's happening in your mosque today."
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        notificationCount={5}
      />
      <StatsSection />
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">Dashboard Content</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This is where the main dashboard content will go.
        </p>
      </div>
    </div>
  );
}