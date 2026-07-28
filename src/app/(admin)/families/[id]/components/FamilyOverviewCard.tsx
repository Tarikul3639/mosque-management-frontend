"use client"

import { format } from "date-fns"
import { CalendarDays, Coins, Hash, MapPin, Phone, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FamilyDetails } from "@/store/api/family.api"

interface FamilyOverviewCardProps {
  family: FamilyDetails
}

export function FamilyOverviewCard({ family }: FamilyOverviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Family Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <DetailItem
          icon={<Hash className="size-4" />}
          label="Family Number"
          value={family.familyNo}
        />

        <DetailItem
          icon={<User className="size-4" />}
          label="Head Name"
          value={family.headName}
        />

        <DetailItem
          icon={<Phone className="size-4" />}
          label="Phone Number"
          value={family.phone || "Not provided"}
        />

        <DetailItem
          icon={<MapPin className="size-4" />}
          label="Address"
          value={family.address || "Not provided"}
        />

        <DetailItem
          icon={<Coins className="size-4" />}
          label="Monthly Fee"
          value={
            family.currentFee
              ? `৳${Number(family.currentFee.monthlyFee).toLocaleString()}`
              : "No fee assigned"
          }
        />

        <DetailItem
          icon={<CalendarDays className="size-4" />}
          label="Created At"
          value={format(family.createdAt, "dd MMM yyyy, hh:mm a")}
        />

        <DetailItem
          icon={<CalendarDays className="size-4" />}
          label="Last Updated"
          value={format(family.updatedAt, "dd MMM yyyy, hh:mm a")}
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
