import { CalendarDays, ReceiptText, UserRound } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import type { Expense } from "@/types/expense"

import { getExpenseCategoryLabel } from "../constants"

import { formatBengaliDate } from "@/utils/format-bengali-date"
import { formatBengaliNumber } from "@/utils/format-bengali-number"

interface ExpenseCardProps {
  expense: Expense
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  return (
    <Card className="transition-all hover:-translate-y-1 hover:shadow-md">
      <CardContent className="space-y-5 p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-lg font-semibold">
              {expense.title}
            </h3>

            <p className="mt-2 text-2xl font-bold text-primary">
              ৳{formatBengaliNumber(expense.amount)}
            </p>
          </div>

          <Badge variant="secondary">
            {getExpenseCategoryLabel(expense.category)}
          </Badge>
        </div>

        {/* Note */}
        {expense.note && (
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {expense.note}
            </p>
          </div>
        )}

        {/* Info */}
        <div className="space-y-3 border-t pt-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="size-4 shrink-0" />

            <span>{formatBengaliDate(expense.expenseDate)}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <UserRound className="size-4 shrink-0" />

            <span>{expense.createdBy.name}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <ReceiptText className="size-4 shrink-0" />

            <span>{getExpenseCategoryLabel(expense.category)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
