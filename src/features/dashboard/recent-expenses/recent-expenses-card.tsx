"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { ExpenseItem } from "./expense-item"
import { RecentExpensesLoading } from "./recent-expenses-loading"

export interface RecentExpense {
  id: string
  title: string
  category: string
  amount: number
  expenseDate: string
}

interface Props {
  expenses?: RecentExpense[]
  isLoading?: boolean
}

export function RecentExpensesCard({
  expenses = [],
  isLoading = false,
}: Props) {
  if (isLoading) {
    return <RecentExpensesLoading />
  }

  return (
    <Card className="flex h-full max-h-180 flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Recent Expenses</CardTitle>

          <Button asChild variant="link" size="sm">
            <Link href="/expenses">
              View All
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        {expenses.length === 0 ? (
          <div className="flex h-full min-h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No recent expenses found.
            </p>
          </div>
        ) : (
          <div className="space-y-1 overflow-y-auto">
            {expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
