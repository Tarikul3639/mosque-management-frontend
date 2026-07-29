"use client"

import { format } from "date-fns"
import { CalendarDays, Mail, MapPin, Phone, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Donor } from "@/types/donor"

interface DonorOverviewCardProps {
  donor: Donor
}

export function DonorOverviewCard({ donor }: DonorOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donor Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <DetailItem
          icon={<User className="size-4" />}
          label="Full Name"
          value={donor.name}
        />

        <DetailItem
          icon={<Phone className="size-4" />}
          label="Phone Number"
          value={donor.phone}
        />

        <DetailItem
          icon={<Mail className="size-4" />}
          label="Email Address"
          value={donor.email || "Not provided"}
        />

        <DetailItem
          icon={<MapPin className="size-4" />}
          label="Address"
          value={donor.address || "Not provided"}
        />

        <DetailItem
          icon={<CalendarDays className="size-4" />}
          label="Created At"
          value={format(new Date(donor.createdAt), "dd MMM yyyy, hh:mm a")}
        />

        <DetailItem
          icon={<CalendarDays className="size-4" />}
          label="Last Updated"
          value={format(new Date(donor.updatedAt), "dd MMM yyyy, hh:mm a")}
          last
        />
      </CardContent>
    </Card>
  )
}

interface DetailItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  last?: boolean
}

function DetailItem({ icon, label, value, last = false }: DetailItemProps) {
  return (
    <div
      className={`flex items-start justify-between gap-6 py-3 ${
        !last ? "border-b" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>

      <div className="max-w-sm text-right font-medium wrap-break-word">{value}</div>
    </div>
  )
}
