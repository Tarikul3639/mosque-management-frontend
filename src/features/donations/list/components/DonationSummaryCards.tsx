"use client"

// src/features/donations/list/components/DonationSummaryCards.tsx
import { Calendar, HandCoins, Receipt, Wallet } from "lucide-react"

import { StatsCard, StatsCardSkeleton } from "@/components/common/stats-card"

import { formatCurrency } from "@/utils/format-currency"
import { DonationSummary } from "@/types/donation"

export function DonationSummaryCards({
  data,
  isLoading,
}: {
  data: DonationSummary
  isLoading: boolean
}) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!data) {
    return null
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <StatsCard
        title="Total Donations"
        value={data.totalDonations.toLocaleString()}
        subtitle="All recorded donations"
        icon={<Receipt className="size-5" />}
      />

      <StatsCard
        title="Total Amount"
        value={formatCurrency(data.totalAmount)}
        subtitle="Lifetime donations"
        icon={<HandCoins className="size-5" />}
      />

      <StatsCard
        title="Average Amount"
        value={formatCurrency(data.averageAmount)}
        subtitle="Average donation amount"
        icon={<Wallet className="size-5" />}
      />
    </div>
  )
}
