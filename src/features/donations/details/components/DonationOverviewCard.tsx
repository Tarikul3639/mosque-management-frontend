"use client"

// src/features/donations/details/components/DonationOverviewCard.tsx
import {
  BadgeDollarSign,
  Calendar,
  CreditCard,
  FileText,
  HandCoins,
  ReceiptText,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"

import type { Donation } from "@/types/donation"

interface DonationOverviewCardProps {
  donation: Donation
}

export function DonationOverviewCard({ donation }: DonationOverviewCardProps) {
  return (
    <Card>
      <CardContent className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
        <OverviewItem
          icon={<BadgeDollarSign className="size-5" />}
          label="Amount"
          value={formatCurrency(donation.amount)}
          valueClassName="text-lg font-semibold text-primary"
        />

        <OverviewItem
          icon={<ReceiptText className="size-5" />}
          label="Receipt No"
          value={donation.receiptNo}
        />

        <OverviewItem
          icon={<CreditCard className="size-5" />}
          label="Payment Method"
          value={donation.paymentMethod}
        />

        <OverviewItem
          icon={<Calendar className="size-5" />}
          label="Donation Date"
          value={formatDate(donation.donatedAt)}
        />

        <OverviewItem
          icon={<HandCoins className="size-5" />}
          label="Purpose"
          value={donation.purpose}
        />

        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <FileText className="size-5" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Anonymous</p>

            <Badge variant={donation.isAnonymous ? "secondary" : "outline"}>
              {donation.isAnonymous ? "Anonymous" : "Public"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface OverviewItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  valueClassName?: string
}

function OverviewItem({
  icon,
  label,
  value,
  valueClassName,
}: OverviewItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>

      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>

        <p className={valueClassName}>{value}</p>
      </div>
    </div>
  )
}
