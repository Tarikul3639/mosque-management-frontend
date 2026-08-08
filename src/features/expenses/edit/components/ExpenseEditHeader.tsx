"use client"

import { ROUTES } from "@/config/routes"
// src/features/expenses/edit/components/ExpenseEditHeader.tsx
import Link from "next/link"
import { ArrowLeft, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ExpenseEditHeaderProps {
  expenseId: string
  title: string
}

export function ExpenseEditHeader({
  expenseId,
  title,
}: ExpenseEditHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="space-y-2">
          <Button
            asChild
            variant="ghost"
            className="w-fit px-0 hover:bg-transparent"
          >
            <Link href={ROUTES.ADMIN.EXPENSES.DETAIL(expenseId)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Expense
            </Link>
          </Button>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pencil className="size-6 text-primary" />

              <h1 className="text-3xl font-bold tracking-tight">
                Edit Expense
              </h1>
            </div>

            <Badge variant="secondary" className="ml-2">
              {title}
            </Badge>
          </div>
        </div>
      </div>

      <Button asChild variant="outline">
        <Link href={ROUTES.ADMIN.EXPENSES.DETAIL(expenseId)}>View Details</Link>
      </Button>
    </div>
  )
}
