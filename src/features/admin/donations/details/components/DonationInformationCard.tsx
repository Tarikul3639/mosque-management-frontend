"use client"

// src/features/donations/details/components/DonationInformationCard.tsx
import { CreditCard, FileText, Hash, UserCog } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { Donation } from "@/types/donation"

interface DonationInformationCardProps {
  donation: Donation
}

export function DonationInformationCard({
  donation,
}: DonationInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Information</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-5 md:grid-cols-2">
        <InfoItem
          icon={<CreditCard className="size-4" />}
          label="Payment Method"
          value={donation.paymentMethod}
        />

        <InfoItem
          icon={<Hash className="size-4" />}
          label="Transaction Reference"
          value={donation.transactionReference ?? "—"}
        />

        <InfoItem
          icon={<FileText className="size-4" />}
          label="Purpose"
          value={donation.purpose}
          className="md:col-span-2"
        />

        <InfoItem
          icon={<FileText className="size-4" />}
          label="Note"
          value={donation.note ?? "—"}
          className="md:col-span-2"
        />

        <InfoItem
          icon={<UserCog className="size-4" />}
          label="Created By"
          value={donation.createdBy?.name ?? "—"}
        />

        <InfoItem
          icon={<UserCog className="size-4" />}
          label="Updated By"
          value={donation.updatedBy?.name ?? "—"}
        />
      </CardContent>
    </Card>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  className?: string
}

function InfoItem({ icon, label, value, className }: InfoItemProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>

      <div className="rounded-lg border bg-muted/30 px-4 py-3">
        <p className="text-sm font-medium wrap-break-word">{value}</p>
      </div>
    </div>
  )
}
