"use client"

import { useState } from "react"
import { type DateRange } from "react-day-picker"

import { useMeQuery } from "@/store/api/auth.api"
import {
  useGetDashboardOverviewQuery,
  useGetExpenseChartQuery,
  useGetFinancialSummaryQuery,
  useGetMonthlyChartQuery,
  useGetRecentDonationsQuery,
  useGetRecentExpensesQuery,
} from "@/store/api/dashboard.api"

import { DashboardHeader } from "./DashboardHeader"
import { DashboardStatsSection } from "./DashboardStatsSection"
import { DonationExpenseChart } from "./charts/DonationExpenseChart"
import { ExpenseCategoryChart } from "./charts/expense-category-chart"
import { FinancialSummaryChart } from "./charts/financial-summary-chart"
import { RecentDonationsCard } from "./recent-donations/recent-donations-card"
import { RecentExpensesCard } from "./recent-expenses/recent-expenses-card"

export function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>()

  const { data: me } = useMeQuery()

  const { data: overview, isLoading } = useGetDashboardOverviewQuery({
    from: dateRange?.from?.toISOString(),
    to: dateRange?.to?.toISOString(),
  })

  const { data: financialSummary, isLoading: isFinancialSummaryLoading } =
    useGetFinancialSummaryQuery({
      from: dateRange?.from?.toISOString(),
      to: dateRange?.to?.toISOString(),
    })

  const { data: monthlyChartData, isLoading: isMonthlyLoading } =
    useGetMonthlyChartQuery({
      from: dateRange?.from?.toISOString(),
      to: dateRange?.to?.toISOString(),
    })

  const { data: expenseChartData, isLoading: isExpenseLoading } =
    useGetExpenseChartQuery({
      from: dateRange?.from?.toISOString(),
      to: dateRange?.to?.toISOString(),
    })

  const { data: recentDonations, isLoading: isRecentDonationsLoading } =
    useGetRecentDonationsQuery()

  const { data: recentExpenses, isLoading: isRecentExpensesLoading } =
    useGetRecentExpensesQuery()

  const handleClear = () => {
    setDateRange(undefined)
  }

  return (
    <div className="flex flex-col gap-6 bg-background px-2 py-2 sm:px-4">
      <DashboardHeader
        userName={me?.name ?? ""}
        subtitle="Here's what's happening in your mosque today."
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        isFiltered={!!dateRange}
        onClear={handleClear}
      />

      <DashboardStatsSection data={overview} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="order-2 xl:order-1 xl:col-span-8">
          <DonationExpenseChart
            data={monthlyChartData ?? []}
            isLoading={isMonthlyLoading}
            from={dateRange?.from?.toISOString()}
            to={dateRange?.to?.toISOString()}
          />
        </div>

        <div className="order-1 xl:order-2 xl:col-span-4">
          <FinancialSummaryChart
            data={
              financialSummary ?? {
                totalCollection: 0,
                totalExpense: 0,
                balance: 0,
                collectionPercentage: 0,
                expensePercentage: 0,
                balancePercentage: 0,
              }
            }
            isLoading={isFinancialSummaryLoading}
          />
        </div>
      </div>

      <ExpenseCategoryChart
        data={expenseChartData ?? []}
        isLoading={isExpenseLoading}
        from={dateRange?.from?.toISOString()}
        to={dateRange?.to?.toISOString()}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentDonationsCard
          donations={recentDonations ?? []}
          isLoading={isRecentDonationsLoading}
        />

        <RecentExpensesCard
          expenses={recentExpenses ?? []}
          isLoading={isRecentExpensesLoading}
        />
      </div>
    </div>
  )
}
