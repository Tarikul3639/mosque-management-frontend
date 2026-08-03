// src/features/expenses/details/components/ExpenseInformationCard.tsx

"use client"

import { AlignLeft, CalendarDays, Tag, User, Wallet } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"
import { formatExpenseCategory } from "@/utils/format-expense-category"

import type { Expense } from "@/types/expense"

interface ExpenseInformationCardProps {
  expense: Expense
}

export function ExpenseInformationCard({
  expense,
}: ExpenseInformationCardProps) {
  return (
    <Card>
      {/* Header section redesigned to feel like an authentic details page banner */}
      <CardHeader className="bg-muted/40 pt-6 pb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {formatExpenseCategory(expense.category ?? "Uncategorized")}
              </Badge>
              <span className="text-xs text-muted-foreground">
                ID: {expense.id}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {expense.title}
            </h2>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Total Amount
            </span>
            <span className="text-3xl font-extrabold tracking-tight text-primary">
              {formatCurrency(expense.amount)}
            </span>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-5 pt-6">
        <InfoRow
          icon={<CalendarDays className="size-4" />}
          label="Expense Date"
          value={formatDate(expense.expenseDate)}
        />

        {expense.createdBy?.name && (
          <InfoRow
            icon={<User className="size-4" />}
            label="Created By"
            value={expense.createdBy.name ?? "Unknown"}
          />
        )}

        {expense.updatedBy?.name && (
          <InfoRow
            icon={<User className="size-4" />}
            label="Updated By"
            value={expense.updatedBy.name ?? "Unknown"}
          />
        )}

        <InfoRow
          icon={<Wallet className="size-4" />}
          label="Amount"
          value={formatCurrency(expense.amount)}
        />

        <InfoRow
          icon={<Tag className="size-4" />}
          label="Category"
          value={formatExpenseCategory(expense.category ?? "Uncategorized")}
        />

        {expense.note && (
          <>
            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-2 font-medium">
                <AlignLeft className="size-4 text-primary" />
                <span>Note</span>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm leading-7 whitespace-pre-wrap text-muted-foreground">
                  {expense.note}
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-3 text-muted-foreground">
        <div className="flex size-8 items-center justify-center rounded-md bg-muted">
          {icon}
        </div>

        <span className="text-sm">{label}</span>
      </div>

      <div className="text-right text-sm font-medium">{value}</div>
    </div>
  )
}
