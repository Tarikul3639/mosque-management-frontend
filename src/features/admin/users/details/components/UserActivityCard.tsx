"use client"

// src/features/user/details/components/UserActivityCard.tsx
import { format } from "date-fns"

import { CalendarPlus2, History, LogIn } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import type { User } from "@/types/user"

interface UserActivityCardProps {
  user: User
}

export function UserActivityCard({ user }: UserActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>

        <CardDescription>User account activity and timestamps.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-1">
        <ActivityRow
          icon={<LogIn className="size-4 text-chart-2" />}
          label="Last Login"
          value={
            user.lastLoginAt
              ? format(new Date(user.lastLoginAt), "dd MMM yyyy, hh:mm a")
              : "Never"
          }
        />

        <Separator />

        <ActivityRow
          icon={<CalendarPlus2 className="size-4 text-chart-3" />}
          label="Created At"
          value={format(new Date(user.createdAt), "dd MMM yyyy, hh:mm a")}
        />

        <Separator />

        <ActivityRow
          icon={<History className="size-4 text-chart-5" />}
          label="Last Updated"
          value={format(new Date(user.updatedAt), "dd MMM yyyy, hh:mm a")}
        />
      </CardContent>
    </Card>
  )
}

interface ActivityRowProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

function ActivityRow({ icon, label, value }: ActivityRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        {icon}

        <span className="text-sm text-muted-foreground">{label}</span>
      </div>

      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  )
}
