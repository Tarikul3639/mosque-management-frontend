"use client"

import { ErrorComponent } from "@/components/common/error"

import { getErrorMessage } from "@/utils/get-error-message"

import { ExpenseInformationCard } from "../shared/ExpenseInformationCard"

import { ExpenseForm } from "../shared/ExpenseForm"

import { ExpenseDangerZone } from "./components/ExpenseDangerZone"
import { ExpenseEditHeader } from "./components/ExpenseEditHeader"
import { ExpenseEditSkeleton } from "./components/ExpenseEditSkeleton"

import { useExpenseEdit } from "./useExpenseEdit"

interface Props {
  id: string
}

export function ExpenseEditPage({ id }: Props) {
  const {
    expense,
    expenseQuery,

    form,

    handleSubmit,
    handleDelete,

    isSubmitting,
    isDeleting,
  } = useExpenseEdit({
    id,
  })

  if (expenseQuery.isLoading) {
    return <ExpenseEditSkeleton />
  }

  if (expenseQuery.isError) {
    return (
      <ErrorComponent
        title="Failed to load expense."
        error={getErrorMessage(expenseQuery.error)}
        onRetry={expenseQuery.refetch}
      />
    )
  }

  if (!expense) {
    return null
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <ExpenseEditHeader expenseId={expense.id} title={expense.title} />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ExpenseForm
            title="Edit Expense"
            submitText="Save Changes"
            form={form}
            isSubmitting={isSubmitting}
            showMetadata
            createdAt={expense.createdAt}
            updatedAt={expense.updatedAt}
            onSubmit={handleSubmit}
            onCancel={() => form.reset()}
          />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <ExpenseInformationCard
            expense={{
              ...expense,
              ...form.watch(),
            }}
          />

          <ExpenseDangerZone isDeleting={isDeleting} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}
