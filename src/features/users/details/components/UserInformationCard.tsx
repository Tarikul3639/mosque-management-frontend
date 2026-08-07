// src/features/user/details/components/UserInformationCard.tsx

"use client"

import { Fingerprint, Mail, Phone, ShieldCheck, User2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import type { User } from "@/types/user"

interface UserInformationCardProps {
  user: User
}

export function UserInformationCard({ user }: UserInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>

        <CardDescription>
          Basic profile and account information.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-1">
        <InfoRow
          icon={<Fingerprint className="size-4 text-primary" />}
          label="User ID"
          value={user.id}
          truncate
        />

        <Separator />

        <InfoRow
          icon={<User2 className="size-4 text-chart-2" />}
          label="Full Name"
          value={user.name}
        />

        <Separator />

        <InfoRow
          icon={<Mail className="size-4 text-chart-3" />}
          label="Email"
          value={user.email}
        />

        <Separator />

        <InfoRow
          icon={<Phone className="size-4 text-chart-4" />}
          label="Phone"
          value={user.phone}
        />

        <Separator />

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-4 text-chart-5" />

            <span className="text-sm text-muted-foreground">Role</span>
          </div>

          <Badge
            variant={user.role === "SUPER_ADMIN" ? "default" : "secondary"}
          >
            {user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
          </Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-4 text-primary" />

            <span className="text-sm text-muted-foreground">Status</span>
          </div>

          <Badge variant={user.status === "ACTIVE" ? "success" : "secondary"}>
            {user.status === "ACTIVE" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  truncate?: boolean
}

function InfoRow({ icon, label, value, truncate }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {icon}

        <span className="text-sm text-muted-foreground">{label}</span>
      </div>

      <span
        className={`max-w-55 text-right text-sm font-medium ${
          truncate ? "truncate" : ""
        }`}
      >
        {value}
      </span>
    </div>
  )
}
