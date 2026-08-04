"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { paymentSchema, type PaymentFormValues } from "@/schemas/payment.schema"
import { getErrorMessage } from "@/utils/get-error-message"
import { useCreatePaymentMutation } from "@/store/api/payment.api"
import { useGetFamiliesQuery } from "@/store/api/family.api"
import { useGetMonthlyChargesQuery } from "@/store/api/monthly-charge.api"

import type { EntityPickerOption } from "@/components/common/entity-picker"

export function usePaymentCreate() {
  const router = useRouter()

  const [familySearch, setFamilySearch] = useState("")
  const [chargeSearch, setChargeSearch] = useState("")

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

  const familyId = form.watch("familyId")

  // ==========================
  // Families
  // ==========================

  const { data: familiesData, isFetching: loadingFamilies } =
    useGetFamiliesQuery({
      page: 1,
      limit: 45,
      search: familySearch,
    })

  const families: EntityPickerOption[] = useMemo(
    () =>
      (familiesData?.data ?? []).map((family) => ({
        id: family.id,
        title: family.familyNo,
        subtitle: family.headName,
        description: family.phone,
        avatar: family.avatar?.url,
      })),
    [familiesData]
  )

  // ==========================
  // Monthly Charges
  // ==========================

  const { data: monthlyChargesData, isFetching: loadingCharges } =
    useGetMonthlyChargesQuery(
      {
        page: 1,
        limit: 45,
        familyId,
        search: chargeSearch,
        outstandingOnly: true,
      },
      {
        skip: !familyId,
      }
    )

  // ==========================
  // Mutation
  // ==========================

  const [createPayment, createState] = useCreatePaymentMutation()

  const handleSubmit = async (values: PaymentFormValues) => {
    try {
      const payment = await createPayment({
        familyId: values.familyId,
        monthlyChargeId: values.monthlyChargeId,
        amount: values.amount,
        method: values.method,
        reference: values.reference || undefined,
        note: values.note || undefined,
        paidAt: values.paidAt,
      }).unwrap()

      toast.success("Payment created successfully.")
      router.push(`/payments/${payment.id}`)
    } catch (error) {
      toast.error("Failed to create payment.", {
        description: getErrorMessage(error),
      })
    }
  }

  return {
    form,
    families,
    monthlyCharges: monthlyChargesData?.data ?? [],
    loadingFamilies,
    loadingCharges,
    handleSearchFamily: setFamilySearch,
    handleSearchCharge: setChargeSearch,
    handleSubmit,
    isSubmitting: createState.isLoading,
  }
}
