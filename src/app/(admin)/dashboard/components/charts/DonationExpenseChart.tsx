"use client";

import Link from "next/link";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { TK } from "@/components/icons/tk";

import { MonthlyChartItem } from "@/store/api/dashboard.api";
import { DonationExpenseChartLoading } from "./donation-expense-chart-loading";

import { formatDateRange } from "@/utils/date";

const chartConfig = {
  donation: {
    label: "Donations",
    color: "var(--color-chart-1)",
  },
  expense: {
    label: "Expenses",
    color: "var(--color-chart-2)",
  },
  collection: {
    label: "Collections",
    color: "var(--color-chart-3)",
  },
} satisfies ChartConfig;

interface Props {
  data: MonthlyChartItem[];
  isLoading: boolean;
  from?: string;
  to?: string;
}

export function DonationExpenseChart({
  data,
  isLoading,
  from,
  to,
}: Props) {
  if (isLoading) {
    return <DonationExpenseChartLoading />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle>Donation vs Expense</CardTitle>

              <span className="text-sm text-muted-foreground">
                ({formatDateRange(from, to)})
              </span>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-6">
              <Legend
                color="var(--color-chart-1)"
                label="Donations"
              />

              <Legend
                color="var(--color-chart-2)"
                label="Expenses"
              />

              <Legend
                color="var(--color-chart-3)"
                label="Collections"
              />
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            size="sm"
          >
            <Link href="/report">
              View Full Report
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-80 w-full"
        >
          <BarChart
            accessibilityLayer
            data={data}
            barGap={6}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)" }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)" }}
              tickFormatter={(value) => `${value / 1000}K`}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />

            <Bar
              dataKey="donation"
              fill="var(--color-chart-1)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="expense"
              fill="var(--color-chart-2)"
              radius={[4, 4, 0, 0]}
            />

            <Bar
              dataKey="collection"
              fill="var(--color-chart-3)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

interface LegendProps {
  color: string;
  label: string;
}

function Legend({
  color,
  label,
}: LegendProps) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="size-3 rounded-sm"
        style={{ backgroundColor: color }}
      />

      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
        {label}

        <span className="inline-flex items-center">
          (<TK className="size-3" />)
        </span>
      </span>
    </div>
  );
}