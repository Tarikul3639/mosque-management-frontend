"use client"

import { ROUTES } from "@/config/routes"
// src/features/expenses/list/components/ExpenseHeader.tsx
import Link from "next/link"
import { Plus, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ExpenseHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-lg border bg-primary/5">
            <Wallet className="size-5 text-primary" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>

            <p className="text-sm text-muted-foreground">
              Manage mosque expenses and financial records.
            </p>
          </div>
        </div>
      </div>

      <Button asChild>
        <Link href={ROUTES.ADMIN.EXPENSES.CREATE} className="gap-2">
          <Plus className="size-4" />
          Add Expense
        </Link>
      </Button>
    </div>
  )
}
