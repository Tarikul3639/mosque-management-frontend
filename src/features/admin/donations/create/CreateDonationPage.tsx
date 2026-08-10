"use client"

import { ROUTES } from "@/config/routes"
// src/features/donations/create/CreateDonationPage.tsx
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { ErrorComponent } from "@/components/common/error"

import {
  donationSchema,
  type DonationFormValues,
} from "@/schemas/donation.schema"

import { getErrorMessage } from "@/utils/get-error-message"
import { PaymentMethod } from "@/types/payment"

import { useCreateDonationMutation } from "@/store/api/donation.api"
import { useGetDonorsQuery } from "@/store/api/donor.api"

import { DonationCreateHeader } from "./components/DonationCreateHeader"
import { DonationForm } from "../shared/DonationForm"
import { DonationReceiptCard } from "../shared/DonationReceiptCard"

export function CreateDonationPage() {
  const router = useRouter()

  const [search, setSearch] = useState("")

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

  const { data, isLoading, isError, error, refetch } = useGetDonorsQuery({
    page: 1,
    limit: 20,
    search: search || undefined,
  })

  const donors = data?.data ?? []

  const selectedDonor = useMemo(() => {
    return donors.find((x) => x.id === form.watch("donorId")) ?? null
  }, [donors, form])

  const [createDonation, { isLoading: isSubmitting }] =
    useCreateDonationMutation()

  const handleSubmit = async (values: DonationFormValues) => {
    try {
      const donation = await createDonation(values).unwrap()

      toast.success("Donation created successfully.")

      router.push(ROUTES.ADMIN.DONATIONS.DETAIL(donation.id))
    } catch (error) {
      toast.error("Failed to create donation.", {
        description: getErrorMessage(error),
      })
    }
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load donors."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <DonationCreateHeader />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <DonationForm
            title="Create Donation"
            submitText="Create Donation"
            form={form}
            donors={donors}
            selectedDonor={selectedDonor}
            loadingDonors={isLoading}
            isSubmitting={isSubmitting}
            showMetadata={false}
            onSearchDonor={setSearch}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </div>

        <div className="xl:col-span-4">
          <DonationReceiptCard
            title="Receipt Preview"
            donation={{
              receiptNo: "Auto Generated",
              amount: form.watch("amount"),
              purpose: form.watch("purpose"),
              paymentMethod: form.watch("paymentMethod"),
              donatedAt: form.watch("donatedAt"),
              isAnonymous: form.watch("isAnonymous"),
              note: form.watch("note"),
            }}
            donor={selectedDonor}
          />
        </div>
      </div>
    </div>
  )
}
