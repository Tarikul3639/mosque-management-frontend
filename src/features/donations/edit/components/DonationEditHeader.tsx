// src/features/donations/edit/components/DonationEditHeader.tsx

"use client"

import Link from "next/link"
import { ArrowLeft, Receipt } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DonationEditHeaderProps {
  donationId: string
  receiptNo: string
}

export function DonationEditHeader({
  donationId,
  receiptNo,
}: DonationEditHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
      <div className="space-y-2">
        <Button
          asChild
          variant="ghost"
          className="w-fit px-0 hover:bg-transparent"
        >
          <Link href={`/donations/${donationId}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Donation
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Donation</h1>

          <p className="mt-1 text-muted-foreground">
            Update donation information and payment details.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <Receipt className="h-5 w-5 text-primary" />
        </div>

        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase">
            Receipt No
          </p>

          <p className="font-semibold">{receiptNo}</p>
        </div>
      </div>
    </div>
  )
}
