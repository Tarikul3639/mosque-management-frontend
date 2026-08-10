"use client"

import { ExpenseInformationCard } from "../shared/ExpenseInformationCard"
import { ExpenseForm } from "../shared/ExpenseForm"

import { ExpenseCreateHeader } from "./components/ExpenseCreateHeader"

import { useExpenseCreate } from "./useExpenseCreate"

export function CreateExpensePage() {
  const { form, handleSubmit, isSubmitting } = useExpenseCreate()

  const values = form.watch()

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <ExpenseCreateHeader />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ExpenseForm
            title="Create Expense"
            submitText="Create Expense"
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </div>

        <div className="xl:col-span-4">
          <ExpenseInformationCard
            expense={{
              id: "Preview",
              title: values.title || "Expense Title",
              amount: values.amount,
              category: values.category,
              note: values.note || "Expense Note",
              expenseDate: values.expenseDate,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),

              createdBy: {
                id: "",
                name: "Current User",
              },

              updatedBy: {
                id: "",
                name: "Current User",
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
