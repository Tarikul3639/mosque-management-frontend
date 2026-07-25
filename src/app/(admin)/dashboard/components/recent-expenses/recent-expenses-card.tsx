"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { RecentExpensesLoading } from "./recent-expenses-loading"
import { ExpenseItem } from "./expense-item"

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
    <Card className="max-h-180 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Expenses</CardTitle>

        <Button asChild size="sm" variant="outline">
          <Link href="/expenses">
            View All
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-1 overflow-y-auto">
        {expenses.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            No recent expenses found.
          </div>
        ) : (
          expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        )}
      </CardContent>
    </Card>
  )
}
