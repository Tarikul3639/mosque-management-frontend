"use client"

import { ROUTES } from "@/config/routes"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { DonationItem } from "./donation-item"
import { RecentDonationsLoading } from "./recent-donations-loading"

export interface RecentDonation {
  id: string
  donorName: string
  amount: number
  receiptNo: string
  paymentMethod: string
  donatedAt: string
}

interface Props {
  donations?: RecentDonation[]
  isLoading?: boolean
}

export function RecentDonationsCard({
  donations = [],
  isLoading = false,
}: Props) {
  if (isLoading) {
    return <RecentDonationsLoading />
  }

  return (
    <Card className="flex h-full max-h-180 flex-col">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>Recent Donations</CardTitle>

          <Button asChild variant="link" size="sm">
            <Link href={ROUTES.ADMIN.DONATIONS.INDEX}>
              View All
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        {donations.length === 0 ? (
          <div className="flex h-full min-h-64 items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No recent donations found.
            </p>
          </div>
        ) : (
          <div className="space-y-1 overflow-y-auto">
            {donations.map((donation) => (
              <DonationItem key={donation.id} donation={donation} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
