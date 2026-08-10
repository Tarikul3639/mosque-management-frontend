"use client"

import { useEffect } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"

import {
  familyFeeSchema,
  type FamilyFeeFormValues,
} from "@/schemas/family-fee.schema"

import { getErrorMessage } from "@/utils/get-error-message"

import {
  useGetFamilyFeeHistoryQuery,
  useUpdateFamilyFeeMutation,
} from "@/store/api/monthly-fees.api"

interface Props {
  familyId: string
  feeId: string
  onSuccess?: () => void
}

export function useEditFamilyFee({ familyId, feeId, onSuccess }: Props) {
  const form = useForm<FamilyFeeFormValues>({
    resolver: zodResolver(familyFeeSchema),

    defaultValues: {
      monthlyFee: 0,
      startDate: "",
      endDate: null,
    },
  })

  const { data: history = [] } = useGetFamilyFeeHistoryQuery({
    familyId,
  })

  const fee = history.find((item) => item.id === feeId)

  useEffect(() => {
    if (!fee) return

    form.reset({
      monthlyFee: fee.monthlyFee,
      startDate: fee.startDate,
      endDate: fee.endDate,
    })
  }, [fee, form])

  const [updateFee, updateState] = useUpdateFamilyFeeMutation()

  const handleSubmit = async (values: FamilyFeeFormValues) => {
    if (!fee) return

    try {
      await updateFee({
        feeId,

        familyId,

        data: {
          monthlyFee: values.monthlyFee,

          startDate: values.startDate,

          endDate: values.endDate,
        },
      }).unwrap()

      toast.success("Monthly fee updated successfully.")

      onSuccess?.()
    } catch (error) {
      toast.error("Failed to update monthly fee.", {
        description: getErrorMessage(error),
      })
    }
  }

  return {
    form,
    fee,
    handleSubmit,
    isSubmitting: updateState.isLoading,
  }
}
