"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExpenseCategoryChartLoading } from "./expense-category-chart-loading"

import { TK } from "@/components/icons/TK"
import { formatDateRange } from "@/utils/date"

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
  "#3b82f6",
  "#22c55e",
  "#facc15",
  "#a855f7",
  "#f97316",
  "#06b6d4",
  "#ef4444",
  "#14b8a6",
  "#8b5cf6",
  "#ec4899",
  "#64748b",
  "#84cc16",
  "#f43f5e",
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

  const totalExpense = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount, 0)
  }, [data])

  const chartData = useMemo(() => {
    return data.map((item, index) => ({
      ...item,
      fill: COLORS[index % COLORS.length],
      percentage: totalExpense === 0 ? 0 : (item.amount / totalExpense) * 100,
    }))
  }, [data, totalExpense])

  if (!chartData.length) {
    return (
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Expense by Category</CardTitle>
        </CardHeader>

        <CardContent className="flex h-80 items-center justify-center">
          <p className="text-muted-foreground">No expense data available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <CardTitle>Expense by Category</CardTitle>

            <span className="text-sm text-muted-foreground">
              ({formatDateRange(from, to)})
            </span>
          </div>
        </div>

        <Link href="/report">
          <Button variant="outline" size="sm">
            View Full Report
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        <div className="grid gap-8 lg:grid-cols-[540px_1fr]">
          <div className="flex items-center justify-center">
            <div className="relative h-80 w-[320px] sm:h-85 sm:w-85">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={110}
                    outerRadius={160}
                    paddingAngle={2}
                    cornerRadius={2}
                    isAnimationActive
                    animationDuration={900}
                    animationBegin={100}
                  ></Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Content */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                    Total
                  </span>

                  <div className="mt-2 flex items-center gap-1">
                    <TK className="size-4 shrink-0 text-foreground" />

                    <span
                      className="truncate text-xl leading-none font-bold sm:text-2xl"
                      title={formatAmount(totalExpense)}
                    >
                      {formatCompactNumber(totalExpense)}
                    </span>
                  </div>

                  <span className="mt-2 text-xs text-muted-foreground">
                    {chartData.length} Categories
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-sm font-semibold">Categories</h4>

              <span className="text-xs text-muted-foreground">
                {chartData.length} Items
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto pr-2">
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

                      {item.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
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
