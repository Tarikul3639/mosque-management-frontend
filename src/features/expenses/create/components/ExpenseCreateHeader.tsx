"use client"

import { ROUTES } from "@/config/routes"
// src/features/expenses/create/components/ExpenseCreateHeader.tsx
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ExpenseCreateHeader() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-start gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href={ROUTES.ADMIN.EXPENSES.INDEX}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Plus className="size-6 text-primary" />

            <h1 className="text-3xl font-bold tracking-tight">
              Create Expense
            </h1>
          </div>

          <p className="text-sm text-muted-foreground">
            Record a new mosque expense and keep your financial records up to
            date.
          </p>
        </div>
      </div>
    </div>
  )
}
