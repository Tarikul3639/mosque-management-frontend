"use client"

import { Shield, ShieldCheck, UserCheck, UserX } from "lucide-react"

import {
  StatsCard,
  StatsCardsSkeletonMap,
} from "@/components/common/stats-card"
import { UserSummary } from "@/types/user"

export function UserSummaryCards({
  data,
  isLoading,
}: {
  data?: UserSummary
  isLoading: boolean
}) {
  if (isLoading) {
    return <StatsCardsSkeletonMap count={4} />
  }

  const active =
    data?.statusBreakdown.find((item) => item.status === "ACTIVE")?.count ?? 0

  const inactive =
    data?.statusBreakdown.find((item) => item.status === "INACTIVE")?.count ?? 0

  const admins =
    data?.roleBreakdown.find((item) => item.role === "ADMIN")?.count ?? 0

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Users"
        value={data?.totalUsers ?? 0}
        icon={<Shield className="size-5" />}
        subtitle="Registered users"
      />

      <StatsCard
        title="Administrators"
        value={admins}
        icon={<ShieldCheck className="size-5" />}
        iconBg="bg-chart-2/10"
        iconColor="text-chart-2"
        subtitle="Admin accounts"
      />

      <StatsCard
        title="Active Users"
        value={active}
        icon={<UserCheck className="size-5" />}
        iconBg="bg-chart-3/10"
        iconColor="text-chart-3"
        subtitle="Currently active"
      />

      <StatsCard
        title="Inactive Users"
        value={inactive}
        icon={<UserX className="size-5" />}
        iconBg="bg-chart-5/10"
        iconColor="text-chart-5"
        subtitle="Disabled accounts"
      />
    </div>
  )
}
