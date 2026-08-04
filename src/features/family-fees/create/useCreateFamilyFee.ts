"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"

import {
    familyFeeSchema,
    type FamilyFeeFormValues,
} from "@/schemas/family-fee.schema"

import { getErrorMessage } from "@/utils/get-error-message"

import { useCreateFamilyFeeMutation } from "@/store/api/monthly-fees.api"

interface Props {
    familyId: string
    onSuccess?: () => void
}

export function useCreateFamilyFee({ familyId, onSuccess }: Props) {
    const form = useForm<FamilyFeeFormValues>({
        resolver: zodResolver(familyFeeSchema),

        defaultValues: {
            monthlyFee: 0,
            startDate: new Date().toISOString(),
            endDate: null,
        },
    })

    const [createFee, createState] = useCreateFamilyFeeMutation()

    const handleSubmit = async (values: FamilyFeeFormValues) => {
        try {
            await createFee({
                familyId,

                data: {
                    monthlyFee: values.monthlyFee,
                    startDate: values.startDate,
                    endDate: values.endDate,
                },
            }).unwrap()

            toast.success("Monthly fee created successfully.")

            form.reset()

            onSuccess?.()
        } catch (error) {
            toast.error("Failed to create monthly fee.", {
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
