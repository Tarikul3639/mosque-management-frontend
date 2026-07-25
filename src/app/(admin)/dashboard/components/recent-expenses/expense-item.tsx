"use client"

import { TK } from "@/components/icons/TK"
import { getExpenseCategoryConfig } from "@/utils/expense-category"
import { formatDate } from "@/utils/date"

export interface RecentExpense {
  id: string
  title: string
  category: string
  amount: number
  expenseDate: string
}

interface ExpenseItemProps {
  expense: RecentExpense
}

function formatAmount(amount: number) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const {
    icon: Icon,
    bgClassName,
    textClassName,
  } = getExpenseCategoryConfig(expense.category)
  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-muted/20">
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`flex size-11 items-center justify-center rounded-full ${bgClassName}`}
        >
          <Icon className={`size-5 ${textClassName}`} />
        </div>

        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold" title={expense.title}>
            {expense.title}
          </h4>

          <p className="truncate text-xs text-muted-foreground">
            {expense.category.replaceAll("_", " ")}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <div className="inline-flex items-center gap-1 font-semibold text-destructive">
          <TK className="size-3" />

          <span>{formatAmount(expense.amount)}</span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {formatDate(expense.expenseDate)}
        </p>
      </div>
    </div>
  )
}
