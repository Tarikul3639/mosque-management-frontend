"use client";

import { FinancialSummary } from "@/types/dashboard";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { FinancialSummaryChartLoading } from "./financial-summary-chart-loading";

interface Props {
  data?: FinancialSummary;
  isLoading?: boolean;
}

function formatAmount(amount: number) {
  return Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function FinancialSummaryChart({
  data,
  isLoading = false,
}: Props) {
  if (isLoading || !data) {
    return <FinancialSummaryChartLoading />;
  }

  const items = [
    {
      title: "Collection",
      amount: data.totalCollection,
      percent: data.collectionPercentage,
      color: "var(--color-chart-3)",
      textClass: "text-chart-3",
      isNegative: false,
    },
    {
      title: "Expense",
      amount: data.totalExpense,
      percent: data.expensePercentage,
      color: "var(--color-chart-2)",
      textClass: "text-chart-2",
      isNegative: false,
    },
    {
      title: "Balance",
      amount: data.balance,
      percent: data.balancePercentage,
      color:
        data.balance >= 0
          ? "var(--color-chart-1)"
          : "var(--color-destructive)",
      textClass:
        data.balance >= 0
          ? "text-chart-1"
          : "text-destructive",
      isNegative: data.balance < 0,
    },
  ];

  const status =
    data.balance >= 0
      ? {
        title: "Healthy Budget",
        description: "Collections currently cover expenses.",
        textClass: "text-chart-1",
      }
      : {
        title: "Budget Deficit",
        description: "Expenses currently exceed collections.",
        textClass: "text-destructive",
      };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Financial Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {items.map((item) => (
          <SummaryItem key={item.title} {...item} />
        ))}

        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium">
            Financial Status
          </p>

          <p
            className={cn(
              "mt-2 text-lg font-bold",
              status.textClass
            )}
          >
            {status.title}
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {status.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface SummaryItemProps {
  title: string;
  amount: number;
  percent: number;
  color: string;
  textClass: string;
  isNegative: boolean;
}

function SummaryItem({
  title,
  amount,
  percent,
  color,
  textClass,
  isNegative,
}: SummaryItemProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">
            {title}
          </p>

          <p className={cn("text-sm font-semibold", textClass)}>
            {isNegative && "-"}৳ {formatAmount(amount)}
          </p>
        </div>

        <span className={cn("text-sm font-bold", textClass)}>
          {isNegative && "-"}
          {percent.toFixed(2)}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${Math.min(Math.abs(percent), 100)}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}