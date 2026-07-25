"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { MonthlyChartItem } from "@/store/api/dashboard.api"
import { DonationExpenseChartLoading } from "./donation-expense-chart-loading"
import { TK } from "@/components/icons/TK"
import Link from "next/link"
import { formatDateRange } from "@/utils/date"

const chartConfig = {
  donations: {
    label: "Donations",
    color: "var(--donation)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--expense)",
  },
  collections: {
    label: "Collections",
    color: "var(--balance)",
  },
} satisfies ChartConfig

interface Props {
  data: MonthlyChartItem[]
  isLoading: boolean
  from?: string
  to?: string
}

export function DonationExpenseChart({ data, isLoading, from, to }: Props) {
  if (isLoading) {
    return <DonationExpenseChartLoading />
  }
  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="w-full">
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CardTitle>Donation vs Expense</CardTitle>

              <span className="text-sm text-muted-foreground">
                ({formatDateRange(from, to)})
              </span>
            </div>
            <Link href="/report" className="ml-auto">
              <Button variant="outline" size="sm">
                View Full Report
              </Button>
            </Link>
          </div>

          <div className="mt-3 flex w-full items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-4 rounded bg-success" />

              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <span>Donations</span>
                <span className="inline-flex items-center">
                  (<TK className="size-3" />)
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 rounded-sm bg-danger" />

              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <span>Expenses</span>
                <span className="inline-flex items-center">
                  (<TK className="size-3" />)
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3.5 w-4 rounded bg-info" />

              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <span>Collections</span>
                <span className="inline-flex items-center">
                  (<TK className="size-3" />)
                </span>
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart accessibilityLayer data={data} barGap={6}>
            <CartesianGrid vertical={false} strokeDasharray="4 4" />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}K`}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey="donation"
              fill="var(--color-donations)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="expense"
              fill="var(--color-expenses)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="collection"
              fill="var(--color-collections)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
