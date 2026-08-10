"use client"

import { ROUTES } from "@/config/routes"
import { useMemo } from "react"
import Link from "next/link"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { TK } from "@/components/icons/tk"

import { ExpenseCategoryChartLoading } from "./expense-category-chart-loading"

import { formatDateRange } from "@/utils/format-date"

export interface ExpenseCategoryItem {
  category: string
  amount: number
}

interface Props {
  data: ExpenseCategoryItem[]
  isLoading: boolean
  from?: string
  to?: string
}

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-primary)",
  "var(--color-secondary)",
  "var(--color-accent)",
  "var(--color-muted-foreground)",
  "var(--color-sidebar-primary)",
]

function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function formatAmount(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function ExpenseCategoryChart({ data, isLoading, from, to }: Props) {
  if (isLoading) {
    return <ExpenseCategoryChartLoading />
  }

  const totalExpense = useMemo(
    () => data.reduce((sum, item) => sum + item.amount, 0),
    [data]
  )

  const chartData = useMemo(
    () =>
      data.map((item, index) => ({
        ...item,
        fill: COLORS[index % COLORS.length],
        percentage: totalExpense === 0 ? 0 : (item.amount / totalExpense) * 100,
      })),
    [data, totalExpense]
  )

  if (!chartData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Expense by Category</CardTitle>
        </CardHeader>

        <CardContent className="flex h-80 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No expense data available.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Expense by Category</CardTitle>

            <span className="text-sm text-muted-foreground">
              ({formatDateRange(from, to)})
            </span>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href={ROUTES.ADMIN.DASHBOARD}>View Full Report</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-8 lg:grid-cols-[520px_1fr]">
          {/* Chart */}
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius={105}
                    outerRadius={155}
                    paddingAngle={2}
                    cornerRadius={4}
                    animationDuration={800}
                  >
                    {chartData.map((item) => (
                      <Cell key={item.category} fill={item.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Total
                  </p>

                  <div className="mt-2 flex items-center justify-center gap-1">
                    <TK className="size-4" />

                    <span
                      className="text-2xl font-bold"
                      title={formatAmount(totalExpense)}
                    >
                      {formatCompactNumber(totalExpense)}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {chartData.length} Categories
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold">Categories</h4>

              <span className="text-xs text-muted-foreground">
                {chartData.length} Items
              </span>
            </div>

            <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
              {chartData.map((item) => (
                <div
                  key={item.category}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="size-3 rounded-full"
                      style={{
                        backgroundColor: item.fill,
                      }}
                    />

                    <span className="text-sm font-medium">{item.category}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1 text-sm font-medium">
                      <TK className="size-3" />
                      {formatAmount(item.amount)}
                    </span>

                    <span className="w-14 text-right text-sm text-muted-foreground">
                      {item.percentage.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
