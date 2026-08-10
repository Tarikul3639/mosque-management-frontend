"use client"

import { Landmark, Receipt, Users, Wallet } from "lucide-react"

import type { DashboardOverview } from "@/types/dashboard"

import { getBalanceStyle } from "@/utils/get-balance-style"

import {
  StatsCard,
  StatsCardsSkeletonMap,
} from "@/components/common/stats-card"

interface StatsSectionProps {
  data?: DashboardOverview
  isLoading?: boolean
}

export function DashboardStatsSection({
  data,
  isLoading = false,
}: StatsSectionProps) {
  if (isLoading) {
    return <StatsCardsSkeletonMap count={4} />
  }

  const balanceStyle = getBalanceStyle(data?.balance.total ?? 0)

  const stats = [
    {
      title: "Total Donations",
      value: `৳ ${(data?.donations.total ?? 0).toLocaleString("en-US")}`,
      subtitle: "from last month",
      change: data?.donations.growth ?? 0,
      trend: data?.donations.trend ?? "neutral",
      icon: <Wallet className="size-5" />,
      iconBg: "bg-chart-1/15",
      iconColor: "text-chart-1",
    },
    {
      title: "Total Expenses",
      value: `৳ ${(data?.expenses.total ?? 0).toLocaleString("en-US")}`,
      subtitle: "from last month",
      change: data?.expenses.growth ?? 0,
      trend: data?.expenses.trend ?? "neutral",
      icon: <Receipt className="size-5" />,
      iconBg: "bg-chart-2/15",
      iconColor: "text-chart-2",
    },
    {
      title: "Net Balance",
      value: `৳ ${(data?.balance.total ?? 0).toLocaleString("en-US")}`,
      valueColor: balanceStyle.text,
      subtitle: "from last month",
      change: data?.balance.growth ?? 0,
      trend: data?.balance.trend ?? "neutral",
      icon: <Landmark className="size-5" />,
      iconBg: "bg-chart-3/15",
      iconColor: "text-chart-3",
    },
    {
      title: "Total Families",
      value: `${data?.families.total ?? 0}`,
      subtitle: "from last month",
      change: data?.families.growth ?? 0,
      trend: data?.families.trend ?? "neutral",
      icon: <Users className="size-5" />,
      iconBg: "bg-chart-4/15",
      iconColor: "text-chart-4",
    },
  ]

  return (
    <section className="grid gap-5 px-2 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </section>
  )
}
