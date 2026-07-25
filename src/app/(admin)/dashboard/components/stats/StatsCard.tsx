"use client"

import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { getTrendStyle, type Trend } from "@/utils/get-trend-color"

interface StatsCardProps {
  title: string
  value: string
  change: number
  trend: Trend
  subtitle?: string
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  valueColor?: string
}

export function StatsCard({
  title,
  value,
  change,
  trend,
  subtitle = "from last month",
  icon,
  iconBg,
  iconColor,
  valueColor,
}: StatsCardProps) {
  const trendStyle = getTrendStyle(trend)

  return (
    <div className="rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
            iconBg
          )}
        >
          <div className={iconColor}>{icon}</div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{title}</p>

          <h3
            className={cn(
              "mt-0.5 text-xl font-bold tracking-tight",
              valueColor
            )}
          >
            {value}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-xs">
            <ArrowUpRight className={cn("h-3.5 w-3.5", trendStyle.text)} />

            <span className={cn("font-medium", trendStyle.text)}>
              {change}%
            </span>

            <span className="truncate text-muted-foreground">{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
