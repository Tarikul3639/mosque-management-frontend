"use client"

import { Crown, ShieldCheck, UserCheck, Users } from "lucide-react"

import {
  StatsCard,
  StatsCardsSkeletonMap,
} from "@/components/common/stats-card"

import type { CommitteeSummary } from "@/types/committee"

interface CommitteeSummaryCardsProps {
  summary?: CommitteeSummary | null
  isLoading?: boolean
}

export function CommitteeSummaryCards({
  summary,
  isLoading,
}: CommitteeSummaryCardsProps) {
  if (isLoading) {
    return <StatsCardsSkeletonMap count={4} />
  }

  const {
    totalMembers = 0,
    activeMembers = 0,
    inactiveMembers = 0,
    presidents = 0,
    vicePresidents = 0,
    secretaries = 0,
    assistantSecretaries = 0,
    treasurers = 0,
  } = summary ?? {}

  const executives =
    presidents +
    vicePresidents +
    secretaries +
    assistantSecretaries +
    treasurers

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Members"
        value={totalMembers}
        subtitle="All committee members"
        icon={<Users className="size-5" />}
      />

      <StatsCard
        title="Active Members"
        value={activeMembers}
        subtitle="Currently active members"
        icon={<UserCheck className="size-5" />}
        iconBg="bg-green-500/10"
        iconColor="text-green-600"
      />

      <StatsCard
        title="Executive Members"
        value={executives}
        subtitle="President, Secretary & Treasurer panel"
        icon={<Crown className="size-5" />}
        iconBg="bg-amber-500/10"
        iconColor="text-amber-600"
      />

      <StatsCard
        title="Inactive Members"
        value={inactiveMembers}
        subtitle="Currently inactive members"
        icon={<ShieldCheck className="size-5" />}
        iconBg="bg-red-500/10"
        iconColor="text-red-600"
      />
    </div>
  )
}
