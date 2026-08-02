"use client"

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"

import { expenseSchema, type ExpenseFormValues } from "@/schemas/expense.schema"

import { getErrorMessage } from "@/utils/get-error-message"

import {
    useDeleteExpenseMutation,
    useGetExpenseQuery,
    useUpdateExpenseMutation,
} from "@/store/api/expense.api"

interface Props {
    id: string
}

export function useExpenseEdit({ id }: Props) {
    const router = useRouter()

    const form = useForm<ExpenseFormValues>({
        resolver: zodResolver(expenseSchema),

        defaultValues: {
            title: "",
            amount: 0,
            category: undefined,
            note: "",
            expenseDate: new Date().toISOString(),
        },
    })

    const expenseQuery = useGetExpenseQuery(id)

    const { data: expense } = expenseQuery

    const [updateExpense, updateState] = useUpdateExpenseMutation()

    const [deleteExpense, deleteState] = useDeleteExpenseMutation()

    useEffect(() => {
        if (!expense) return

        form.reset({
            title: expense.title,
            amount: Number(expense.amount),
            category: expense.category ?? undefined,
            note: expense.note ?? "",
            expenseDate: expense.expenseDate,
        })
    }, [expense, form])

    const handleSubmit = async (values: ExpenseFormValues) => {
        if (!expense) return

        try {
            await updateExpense({
                id: expense.id,
                data: values,
            }).unwrap()

            toast.success("Expense updated successfully.")

            router.push(`/expenses/${expense.id}`)
        } catch (error) {
            toast.error("Failed to update expense.", {
                description: getErrorMessage(error),
            })
        }
    }

    const handleDelete = async () => {
        if (!expense) return

        try {
            await deleteExpense(expense.id).unwrap()

            toast.success("Expense deleted successfully.")

            router.push("/expenses")
        } catch {
            toast.error("Failed to delete expense.")
        }
    }

    return {
        expense,

        expenseQuery,

        form,

        handleSubmit,
        handleDelete,

        isSubmitting: updateState.isLoading,

        isDeleting: deleteState.isLoading,
    }
}
