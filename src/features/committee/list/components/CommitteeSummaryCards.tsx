"use client"

import { Crown, ShieldCheck, UserCheck, Users } from "lucide-react"

import { StatsCard } from "@/components/common/stats-card"

import type { CommitteeSummary } from "@/types/committee"

interface CommitteeSummaryCardsProps {
  summary: CommitteeSummary
}

export function CommitteeSummaryCards({ summary }: CommitteeSummaryCardsProps) {
  const executives =
    summary.presidents +
    summary.vicePresidents +
    summary.secretaries +
    summary.assistantSecretaries +
    summary.treasurers

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Members"
        value={summary.totalMembers}
        subtitle="All committee members"
        icon={<Users className="size-5" />}
      />

      <StatsCard
        title="Active Members"
        value={summary.activeMembers}
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
        value={summary.inactiveMembers}
        subtitle="Currently inactive members"
        icon={<ShieldCheck className="size-5" />}
        iconBg="bg-red-500/10"
        iconColor="text-red-600"
      />
    </div>
  )
}
