"use client"

import { Landmark, Receipt, Users, Wallet } from "lucide-react"

import type { DashboardOverview } from "@/store/api/dashboard.api"

import { getBalanceStyle } from "@/utils/get-balance-style"

import { StatsCard } from "./StatsCard"
import { StatsCardSkeleton } from "./StatsCardSkeleton"

interface StatsSectionProps {
  data?: DashboardOverview
  isLoading?: boolean
}

export function StatsSection({ data, isLoading = false }: StatsSectionProps) {
  if (isLoading) {
    return (
      <section className="grid gap-5 px-2 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <StatsCardSkeleton key={index} />
        ))}
      </section>
    )
  }

  const balanceStyle = getBalanceStyle(data?.balance.total ?? 0)

  return (
    <section className="grid gap-5 px-2 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Donations"
        value={`৳ ${data?.donations.total.toLocaleString() ?? 0}`}
        change={data?.donations.growth ?? 0}
        trend={data?.donations.trend ?? "neutral"}
        icon={<Wallet />}
        iconBg="bg-green-100"
        iconColor="text-green-600"
      />

      <StatsCard
        title="Total Expenses"
        value={`৳ ${data?.expenses.total.toLocaleString() ?? 0}`}
        change={data?.expenses.growth ?? 0}
        trend={data?.expenses.trend ?? "neutral"}
        icon={<Receipt />}
        iconBg="bg-red-100"
        iconColor="text-red-600"
      />

      <StatsCard
        title="Net Balance"
        value={`৳ ${data?.balance.total.toLocaleString() ?? 0}`}
        valueColor={balanceStyle.text}
        change={data?.balance.growth ?? 0}
        trend={data?.balance.trend ?? "neutral"}
        icon={<Landmark />}
        iconBg="bg-blue-100"
        iconColor="text-blue-600"
      />

      <StatsCard
        title="Total Families"
        value={`${data?.families.total ?? 0}`}
        change={data?.families.growth ?? 0}
        trend={data?.families.trend ?? "neutral"}
        icon={<Users />}
        iconBg="bg-violet-100"
        iconColor="text-violet-600"
      />
    </section>
  )
}
