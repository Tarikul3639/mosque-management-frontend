// src/features/expenses/details/ExpenseDetailsPage.tsx

"use client"

import { ErrorComponent } from "@/components/common/error"
import { NotFound } from "@/components/common/not-found"

import { getErrorMessage } from "@/utils/get-error-message"

import { useGetExpenseQuery } from "@/store/api/expense.api"

import { ExpenseDetailsHeader } from "./components/ExpenseDetailsHeader"
import { ExpenseDetailsSkeleton } from "./components/ExpenseDetailsSkeleton"
import { ExpenseInformationCard } from "../shared/ExpenseInformationCard"
import { ExpenseTimelineCard } from "./components/ExpenseTimelineCard"

interface ExpenseDetailsPageProps {
  id: string
}

export function ExpenseDetailsPage({ id }: ExpenseDetailsPageProps) {
  const {
    data: expense,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetExpenseQuery(id)

  if (isLoading) {
    return <ExpenseDetailsSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load expense."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  if (!expense) {
    return (
      <NotFound
        title="Expense not found"
        description="The requested expense does not exist."
      />
    )
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <ExpenseDetailsHeader expenseId={expense.id} title={expense.title} />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ExpenseInformationCard expense={expense} />
        </div>
        <div className="xl:col-span-4">
          <ExpenseTimelineCard expense={expense} />
        </div>
      </div>
    </div>
  )
}
