// src/features/donations/details/components/DonationTimelineCard.tsx

"use client"

import { CalendarClock, Clock3, History } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { formatDate } from "@/utils/format-date"

import type { Donation } from "@/types/donation"

interface DonationTimelineCardProps {
  donation: Donation
}

export function DonationTimelineCard({ donation }: DonationTimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <TimelineItem
          icon={<History className="size-5" />}
          title="Donation Date"
          value={formatDate(donation.donatedAt)}
        />

        <TimelineItem
          icon={<CalendarClock className="size-5" />}
          title="Created At"
          value={formatDate(donation.createdAt)}
        />

        <TimelineItem
          icon={<Clock3 className="size-5" />}
          title="Last Updated"
          value={formatDate(donation.updatedAt)}
          isLast
        />
      </CardContent>
    </Card>
  )
}

interface TimelineItemProps {
  icon: React.ReactNode
  title: string
  value: string
  isLast?: boolean
}

function TimelineItem({
  icon,
  title,
  value,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-4">
      {!isLast && (
        <div className="absolute top-10 left-5 h-[calc(100%-1rem)] w-px bg-border" />
      )}

      <div className="z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background text-primary">
        {icon}
      </div>

      <div className="min-w-0 flex-1 pb-6">
        <h4 className="text-sm font-medium">{title}</h4>

        <p className="mt-1 text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
