"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  donationSchema,
  type DonationFormValues,
} from "@/schemas/donation.schema"

import { getErrorMessage } from "@/utils/get-error-message"

import {
  useDeleteDonationMutation,
  useGetDonationQuery,
  useUpdateDonationMutation,
} from "@/store/api/donation.api"

import { useGetDonorsQuery } from "@/store/api/donor.api"
import { PaymentMethod } from "@/types/payment"

interface Props {
  id: string
}

export function useDonationEdit({ id }: Props) {
  const router = useRouter()

  const [donorSearch, setDonorSearch] = useState("")

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      donorId: "",
      amount: 0,
      purpose: "",
      isAnonymous: false,
      paymentMethod: PaymentMethod.CASH,
      transactionReference: "",
      note: "",
      donatedAt: new Date().toISOString(),
    },
  })

  // Donation
  const donationQuery = useGetDonationQuery(id)

  const { data: donation } = donationQuery

  // Donors
  const donorQuery = useGetDonorsQuery({
    page: 1,
    limit: 20,
    search: donorSearch || undefined,
  })

  // Update
  const [updateDonation, updateState] = useUpdateDonationMutation()

  // Delete
  const [deleteDonation, deleteState] = useDeleteDonationMutation()

  useEffect(() => {
    if (!donation) return

    form.reset({
      donorId: donation.donor.id,
      amount: donation.amount,
      purpose: donation.purpose ?? "",
      isAnonymous: donation.isAnonymous,
      paymentMethod: donation.paymentMethod,
      transactionReference: donation.transactionReference ?? "",
      note: donation.note ?? "",
      donatedAt: donation.donatedAt,
    })
  }, [donation, form])

  const selectedDonor = useMemo(() => {
    return (
      donorQuery.data?.data.find((x) => x.id === form.watch("donorId")) ??
      donation?.donor
    )
  }, [donorQuery.data, donation, form])

  const handleSubmit = async (values: DonationFormValues) => {
    if (!donation) return

    try {
      await updateDonation({
        id: donation.id,
        data: values,
      }).unwrap()

      toast.success("Donation updated successfully.")

      router.push(`/donations/${donation.id}`)
    } catch (error) {
      toast.error("Failed to update donation.", {
        description: getErrorMessage(error),
      })
    }
  }

  const handleDelete = async () => {
    if (!donation) return

    try {
      await deleteDonation(donation.id).unwrap()

      toast.success("Donation deleted successfully.")

      router.push("/donations")
    } catch {
      toast.error("Failed to delete donation.")
    }
  }

  return {
    form,

    donation,
    donationQuery,

    donors: donorQuery.data?.data ?? [],
    loadingDonors: donorQuery.isLoading,

    selectedDonor,

    donorSearch,
    setDonorSearch,

    handleSubmit,
    handleDelete,

    isSubmitting: updateState.isLoading,
    isDeleting: deleteState.isLoading,
  }
}
