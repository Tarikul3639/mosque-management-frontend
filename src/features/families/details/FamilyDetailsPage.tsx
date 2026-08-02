"use client"

import { ErrorComponent } from "@/components/common/error"
import { getErrorMessage } from "@/utils/get-error-message"

import { useGetFamilyDetailsQuery } from "@/store/api/family.api"

import { FamilyHeader } from "./FamilyHeader"
import { FamilyProfileCard } from "./FamilyProfileCard"
import { FamilyOverviewCard } from "./FamilyOverviewCard"
import { FamilyPaymentSummaryCard } from "./FamilyPaymentSummaryCard"
import { FamilyPaymentHistory } from "./FamilyPaymentHistory"
import { FamilyFeeHistory } from "./FamilyFeeHistory"
import { FamilyDetailsSkeleton } from "./FamilyDetailsSkeleton"

interface FamilyDetailsPageProps {
  id: string
}

export function FamilyDetailsPage({ id }: FamilyDetailsPageProps) {
  const {
    data: family,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetFamilyDetailsQuery(id)

  if (isLoading) {
    return <FamilyDetailsSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load family."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  if (!family) {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      <FamilyHeader family={family} />

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Profile */}
        <div className="xl:col-span-4 2xl:col-span-3">
          <FamilyProfileCard family={family} />
        </div>

        {/* Information */}
        <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
          <FamilyOverviewCard family={family} />
        </div>
      </div>

      {/* Payment Summary */}
      <FamilyPaymentSummaryCard
        summary={family.paymentSummary}
        currentFee={family.currentFee}
      />

      {/* Payment History */}
      <FamilyPaymentHistory familyId={family.id} />

      {/* Fee History */}
      <FamilyFeeHistory familyId={family.id} />
    </div>
  )
}
