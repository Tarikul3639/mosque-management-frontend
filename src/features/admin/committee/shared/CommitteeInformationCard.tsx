"use client"

import { format, isValid } from "date-fns"

import { CalendarDays, Mail, MapPin, Phone, ShieldCheck } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { getDesignationLabel } from "@/constants/designation"

interface CommitteeInformation {
  designation?: string
  phone?: string | null
  email?: string | null
  address?: string | null
  joiningDate?: string | null
  endDate?: string | null
  isActive?: boolean
  createdAt?: string | null
  updatedAt?: string | null
}

interface CommitteeInformationCardProps {
  member: CommitteeInformation
  title?: string
  showMetadata?: boolean
}

function formatDate(value?: string | null) {
  if (!value) {
    return "—"
  }

  const date = new Date(value)

  if (!isValid(date)) {
    return "—"
  }

  return format(date, "dd MMM yyyy")
}

export function CommitteeInformationCard({
  member,
  title = "Committee Information",
  showMetadata = true,
}: CommitteeInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <InfoItem
          icon={<ShieldCheck className="size-4" />}
          label="Designation"
          value={
            member.designation ? (
              <Badge variant="secondary">
                {getDesignationLabel(member.designation as never)}
              </Badge>
            ) : (
              "—"
            )
          }
        />

        <InfoItem
          icon={<Phone className="size-4" />}
          label="Phone"
          value={member.phone || "—"}
        />

        <InfoItem
          icon={<Mail className="size-4" />}
          label="Email"
          value={member.email || "—"}
        />

        <InfoItem
          icon={<MapPin className="size-4" />}
          label="Address"
          value={member.address || "—"}
        />

        <InfoItem
          icon={<CalendarDays className="size-4" />}
          label="Joining Date"
          value={formatDate(member.joiningDate)}
        />

        <InfoItem
          icon={<CalendarDays className="size-4" />}
          label="End Date"
          value={member.endDate ? formatDate(member.endDate) : "Current"}
        />

        <InfoItem
          icon={<ShieldCheck className="size-4" />}
          label="Status"
          value={
            member.isActive === undefined ? (
              "—"
            ) : member.isActive ? (
              <Badge>Active</Badge>
            ) : (
              <Badge variant="destructive">Inactive</Badge>
            )
          }
        />

        {showMetadata && (
          <>
            <InfoItem
              icon={<CalendarDays className="size-4" />}
              label="Created"
              value={formatDate(member.createdAt)}
            />

            <InfoItem
              icon={<CalendarDays className="size-4" />}
              label="Updated"
              value={formatDate(member.updatedAt)}
            />
          </>
        )}
      </CardContent>
    </Card>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>

        <div className="mt-1 text-sm font-medium wrap-break-word">{value}</div>
      </div>
    </div>
  )
}
