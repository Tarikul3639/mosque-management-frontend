"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { paymentSchema, type PaymentFormValues } from "@/schemas/payment.schema"
import { getErrorMessage } from "@/utils/get-error-message"
import {
  useDeletePaymentMutation,
  useGetPaymentQuery,
  useUpdatePaymentMutation,
} from "@/store/api/payment.api"
import { useGetFamiliesQuery } from "@/store/api/family.api"

interface Props {
  id: string
}

export function usePaymentEdit({ id }: Props) {
  const router = useRouter()

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      familyId: "",
      monthlyChargeId: "",
      amount: 0,
      method: undefined,
      reference: "",
      note: "",
      paidAt: new Date().toISOString(),
    },
  })

  const paymentQuery = useGetPaymentQuery(id)
  const { data: payment } = paymentQuery

  const [familySearch, setFamilySearch] = useState("")

  const { data: familiesData, isFetching: loadingFamilies } =
    useGetFamiliesQuery({
      search: familySearch,
      page: 1,
      limit: 20,
    })

  const [updatePayment, updateState] = useUpdatePaymentMutation()
  const [deletePayment, deleteState] = useDeletePaymentMutation()

  useEffect(() => {
    if (!payment) return

    form.reset({
      familyId: payment.familyId,
      monthlyChargeId: payment.monthlyChargeId,
      amount: payment.paymentAmount,
      method: payment.method,
      reference: payment.reference ?? "",
      note: payment.note ?? "",
    })
  }, [payment, form])

  const handleSubmit = async (values: PaymentFormValues) => {
    if (!payment) return

    try {
      await updatePayment({
        id: payment.id,
        data: {
          amount: values.amount,
          method: values.method,
          reference: values.reference || undefined,
          note: values.note || undefined,
        },
      }).unwrap()

      toast.success("Payment updated successfully.")
      router.push(`/payments/${payment.id}`)
    } catch (error) {
      toast.error("Failed to update payment.", {
        description: getErrorMessage(error),
      })
    }
  }

  const handleDelete = async () => {
    if (!payment) return

    try {
      await deletePayment(payment.id).unwrap()

      toast.success("Payment deleted successfully.")
      router.push("/payments")
    } catch (error) {
      toast.error("Failed to delete payment.", {
        description: getErrorMessage(error),
      })
    }
  }

  return {
    payment,
    paymentQuery,
    form,
    families: familiesData?.data ?? [],
    loadingFamilies,
    handleSearchFamily: setFamilySearch,
    handleSubmit,
    handleDelete,
    isSubmitting: updateState.isLoading,
    isDeleting: deleteState.isLoading,
  }
}
