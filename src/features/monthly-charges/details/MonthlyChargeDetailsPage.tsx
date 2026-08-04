// src/features/monthly-charges/details/MonthlyChargeDetailsPage.tsx

"use client"

import { ErrorComponent } from "@/components/common/error"

import { getErrorMessage } from "@/utils/get-error-message"

import { useGetMonthlyChargeQuery } from "@/store/api/monthly-charge.api"

import { MonthlyChargeDetailsHeader } from "./components/MonthlyChargeDetailsHeader"
import { MonthlyChargeDetailsSkeleton } from "./components/MonthlyChargeDetailsSkeleton"
import { MonthlyChargeInformationCard } from "../shared/MonthlyChargeInformationCard"
import { MonthlyChargeTimelineCard } from "./components/MonthlyChargeTimelineCard"

interface MonthlyChargeDetailsPageProps {
  id: string
}

export function MonthlyChargeDetailsPage({
  id,
}: MonthlyChargeDetailsPageProps) {
  const {
    data: monthlyCharge,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMonthlyChargeQuery(id)

  if (isLoading) {
    return <MonthlyChargeDetailsSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load monthly charge."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  if (!monthlyCharge) {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      <MonthlyChargeDetailsHeader
        id={monthlyCharge.id}
        familyNo={monthlyCharge.familyNo}
        month={monthlyCharge.month}
        year={monthlyCharge.year}
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <MonthlyChargeInformationCard monthlyCharge={monthlyCharge} />
        </div>

        <div className="xl:col-span-4">
          <MonthlyChargeTimelineCard
            createdAt={monthlyCharge.createdAt}
            updatedAt={monthlyCharge.updatedAt}
            dueDate={monthlyCharge.dueDate}
            paidAt={monthlyCharge.paidAt}
          />
        </div>
      </div>
    </div>
  )
}
