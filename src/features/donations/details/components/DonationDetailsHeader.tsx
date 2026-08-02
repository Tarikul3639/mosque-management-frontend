// src/features/donations/details/components/DonationDetailsHeader.tsx

"use client"

import Link from "next/link"
import { ArrowLeft, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DonationDetailsHeaderProps {
  donationId: string
  receiptNo: string
}

export function DonationDetailsHeader({
  donationId,
  receiptNo,
}: DonationDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <Button
          asChild
          variant="ghost"
          className="mb-2 w-fit px-0 hover:bg-transparent"
        >
          <Link href="/donations">
            <ArrowLeft className="mr-2 size-4" />
            Back to Donations
          </Link>
        </Button>

        <h1 className="text-3xl font-bold tracking-tight">Donation Details</h1>

        <p className="text-sm text-muted-foreground">
          Receipt No:{" "}
          <span className="font-medium text-foreground">{receiptNo}</span>
        </p>
      </div>

      <Button asChild>
        <Link href={`/donations/${donationId}/edit`}>
          <Pencil className="mr-2 size-4" />
          Edit Donation
        </Link>
      </Button>
    </div>
  )
}
