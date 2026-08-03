"use client"

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"

import {
    monthlyChargeSchema,
    type MonthlyChargeFormValues,
} from "@/schemas/monthly-charge.schema"

import { getErrorMessage } from "@/utils/get-error-message"

import {
    useDeleteMonthlyChargeMutation,
    useGetMonthlyChargeQuery,
    useUpdateMonthlyChargeMutation,
} from "@/store/api/monthly-charge.api"

interface Props {
    id: string
}

export function useMonthlyChargeEdit({ id }: Props) {
    const router = useRouter()

    const form = useForm<MonthlyChargeFormValues>({
        resolver: zodResolver(monthlyChargeSchema),

        defaultValues: {
            amount: 0,
            paidAmount: 0,
            dueDate: new Date().toISOString(),
            paidAt: null,
        },
    })

    const monthlyChargeQuery = useGetMonthlyChargeQuery(id)

    const { data: monthlyCharge } = monthlyChargeQuery

    const [updateMonthlyCharge, updateState] = useUpdateMonthlyChargeMutation()

    const [deleteMonthlyCharge, deleteState] = useDeleteMonthlyChargeMutation()

    useEffect(() => {
        if (!monthlyCharge) return

        form.reset({
            amount: Number(monthlyCharge.amount),
            paidAmount: Number(monthlyCharge.paidAmount),
            dueDate: monthlyCharge.dueDate,
            paidAt: monthlyCharge.paidAt ?? null,
        })
    }, [monthlyCharge, form])

    const handleSubmit = async (values: MonthlyChargeFormValues) => {
        console.log("submit");
        if (!monthlyCharge) return

        try {
            await updateMonthlyCharge({
                id: monthlyCharge.id,

                data: {
                    amount: values.amount,
                    paidAmount: values.paidAmount,
                    dueDate: values.dueDate,
                    paidAt: values.paidAt,
                },
            }).unwrap()

            toast.success("Monthly charge updated successfully.")

            router.push(`/monthly-charges/${monthlyCharge.id}`)
        } catch (error) {
            toast.error("Failed to update monthly charge.", {
                description: getErrorMessage(error),
            })
        }
    }

    const handleDelete = async () => {
        if (!monthlyCharge) return

        try {
            await deleteMonthlyCharge(monthlyCharge.id).unwrap()

            toast.success("Monthly charge deleted successfully.")

            router.push("/monthly-charges")
        } catch (error) {
            toast.error("Failed to delete monthly charge.", {
                description: getErrorMessage(error),
            })
        }
    }

    return {
        monthlyCharge,

        monthlyChargeQuery,

        form,

        handleSubmit,
        handleDelete,

        isSubmitting: updateState.isLoading,

        isDeleting: deleteState.isLoading,
    }
}
