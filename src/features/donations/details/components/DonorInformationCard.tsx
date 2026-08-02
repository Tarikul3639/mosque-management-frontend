// src/features/donations/details/components/DonorInformationCard.tsx

"use client"

import Link from "next/link"
import { ArrowRight, Mail, MapPin, Phone, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { getAvatarClass, getAvatarInitials } from "@/utils/avatar.utils"

import type { Donation } from "@/types/donation"

interface DonorInformationCardProps {
  donation: Donation
}

export function DonorInformationCard({ donation }: DonorInformationCardProps) {
  const donor = donation.donor

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donor Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage alt={donor.name} />

            <AvatarFallback className={getAvatarClass(donor.name)}>
              {getAvatarInitials(donor.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-lg font-semibold">{donor.name}</h3>

            <p className="text-sm text-muted-foreground">
              Donation Contributor
            </p>
          </div>

          <Button asChild variant="outline" size="sm">
            <Link href={`/donors/${donor.id}`}>
              View
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <InfoItem
            icon={<Phone className="size-4" />}
            label="Phone"
            value={donor.phone}
          />

          <InfoItem
            icon={<Mail className="size-4" />}
            label="Email"
            value={donor.email ?? "—"}
          />

          <InfoItem
            icon={<MapPin className="size-4" />}
            label="Address"
            value={donor.address ?? "—"}
            className="sm:col-span-2"
          />
        </div>
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
      <div className="mb-2 flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-sm">{label}</span>
      </div>

      <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-4 py-3">
        <User className="size-4 text-muted-foreground" />

        <span className="truncate text-sm font-medium">{value}</span>
      </div>
    </div>
  )
}
