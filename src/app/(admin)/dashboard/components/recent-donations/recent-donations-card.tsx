"use client"

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

export function RecentDonationsCard({ donations = [], isLoading }: Props) {
  if (isLoading) {
    return <RecentDonationsLoading />
  }

  return (
    <Card className="max-h-180 rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Recent Donations</CardTitle>

        <Button asChild size="sm" variant="outline">
          <Link href="/donations">
            View All
            <ArrowRight className="ml-1 size-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-1 overflow-y-auto">
        {donations.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            No recent donations found.
          </div>
        ) : (
          donations.map((donation) => (
            <DonationItem key={donation.id} donation={donation} />
          ))
        )}
      </CardContent>
    </Card>
  )
}
