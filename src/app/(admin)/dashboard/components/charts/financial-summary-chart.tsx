"use client"

import { FinancialSummary } from "@/store/api/dashboard.api"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { cn } from "@/lib/utils"

import { FinancialSummaryChartLoading } from "./financial-summary-chart-loading"

interface Props {
  data?: FinancialSummary
  isLoading?: boolean
}

function formatAmount(amount: number) {
  return Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function FinancialSummaryChart({ data, isLoading = false }: Props) {
  if (isLoading || !data) {
    return <FinancialSummaryChartLoading />
  }

  const items = [
    {
      title: "Collection",
      amount: data.totalCollection,
      percent: data.collectionPercentage,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      isNegative: false,
    },
    {
      title: "Expense",
      amount: data.totalExpense,
      percent: data.expensePercentage,
      color: "bg-red-500",
      textColor: "text-red-600",
      isNegative: false,
    },
    {
      title: "Balance",
      amount: data.balance,
      percent: data.balancePercentage,
      color: data.balance >= 0 ? "bg-emerald-500" : "bg-red-500",
      textColor: data.balance >= 0 ? "text-emerald-600" : "text-red-600",
      isNegative: data.balance < 0,
    },
  ]

  return (
    <Card className="h-full rounded-xl">
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {items.map((item) => (
          <div key={item.title} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{item.title}</p>

                <p className={cn("text-sm font-semibold", item.textColor)}>
                  {item.isNegative && "-"}৳ {formatAmount(item.amount)}
                </p>
              </div>

              <span className={cn("text-sm font-bold", item.textColor)}>
                {item.isNegative && "-"}
                {item.percent.toFixed(2)}%
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-700 ease-in-out",
                  item.color
                )}
                style={{
                  width: `${Math.min(item.percent, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}

        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium">Financial Status</p>

          <p
            className={cn(
              "mt-2 text-lg font-bold",
              data.balance >= 0 ? "text-emerald-600" : "text-red-600"
            )}
          >
            {data.balance >= 0 ? "Healthy Budget" : "Budget Deficit"}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {data.balance >= 0
              ? "Collections currently cover expenses."
              : "Expenses currently exceed collections."}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
