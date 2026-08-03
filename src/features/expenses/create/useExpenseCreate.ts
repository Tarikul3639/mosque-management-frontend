"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { expenseSchema, type ExpenseFormValues } from "@/schemas/expense.schema"

import { getErrorMessage } from "@/utils/get-error-message"

import { ExpenseCategory } from "@/types/expense"

import { useCreateExpenseMutation } from "@/store/api/expense.api"

export function useExpenseCreate() {
  const router = useRouter()

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      category: ExpenseCategory.OTHER,
      note: "",
      expenseDate: new Date().toISOString(),
    },
  })

  const [createExpense, createState] = useCreateExpenseMutation()

  const handleSubmit = async (values: ExpenseFormValues) => {
    try {
      const expense = await createExpense(values).unwrap()

      toast.success("Expense created successfully.")

      router.push(`/expenses/${expense.id}`)
    } catch (error) {
      toast.error("Failed to create expense.", {
        description: getErrorMessage(error),
      })
    }
  }

  return {
    form,

    handleSubmit,

    isSubmitting: createState.isLoading,
  }
}
