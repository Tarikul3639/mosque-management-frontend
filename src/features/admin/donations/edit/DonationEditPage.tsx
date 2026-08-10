"use client"

// src/features/donations/edit/DonationEditPage.tsx
import { ErrorComponent } from "@/components/common/error"

import { getErrorMessage } from "@/utils/get-error-message"

import { DonationEditHeader } from "./components/DonationEditHeader"
import { DonationEditSkeleton } from "./components/DonationEditSkeleton"
import { DonationDangerZone } from "./components/DonationDangerZone"
// Shared Components
import { DonationForm } from "../shared/DonationForm"
import { DonationReceiptCard } from "../shared/DonationReceiptCard"
// Hooks
import { useDonationEdit } from "./useDonationEdit"

interface DonationEditPageProps {
  id: string
}

export function DonationEditPage({ id }: DonationEditPageProps) {
  const {
    donation,
    donationQuery,

    form,

    donors,
    loadingDonors,

    selectedDonor,

    setDonorSearch,

    handleSubmit,
    handleDelete,

    isSubmitting,
    isDeleting,
  } = useDonationEdit({
    id,
  })

  if (donationQuery.isLoading) {
    return <DonationEditSkeleton />
  }

  if (donationQuery.isError) {
    return (
      <ErrorComponent
        title="Failed to load donation."
        error={getErrorMessage(donationQuery.error)}
        onRetry={donationQuery.refetch}
      />
    )
  }

  if (!donation) {
    return null
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <DonationEditHeader
        donationId={donation.id}
        receiptNo={donation.receiptNo}
      />

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Form */}
        <div className="xl:col-span-8">
          <DonationForm
            title="Edit Donation"
            submitText="Save Changes"
            form={form}
            donors={donors}
            selectedDonor={selectedDonor}
            loadingDonors={loadingDonors}
            isSubmitting={isSubmitting}
            showMetadata
            createdAt={donation.createdAt}
            updatedAt={donation.updatedAt}
            onSearchDonor={setDonorSearch}
            onSubmit={handleSubmit}
            onCancel={() => form.reset()}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6 xl:col-span-4">
          <DonationReceiptCard
            title="Receipt Preview"
            donation={{
              ...donation,
              ...form.watch(),
            }}
            donor={selectedDonor}
          />

          <DonationDangerZone isDeleting={isDeleting} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}
