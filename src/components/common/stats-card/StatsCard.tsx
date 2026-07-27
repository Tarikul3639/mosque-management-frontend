"use client"

import { memo } from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { Card } from "@/components/ui/card"

import { cn } from "@/lib/utils"
import { getTrendStyle, type Trend } from "@/utils/get-trend-color"

interface StatsCardProps {
    title: string
    value: string | number

    icon?: React.ReactNode

    iconBg?: string
    iconColor?: string

    change?: number
    trend?: Trend

    subtitle?: string

    valueColor?: string

    footer?: React.ReactNode

    className?: string

    onClick?: () => void
}

export const StatsCard = memo(function StatsCard({
    title,
    value,

    icon,

    iconBg = "bg-primary/10",
    iconColor = "text-primary",

    change,
    trend,

    subtitle,

    valueColor,

    footer,

    className,

    onClick,
}: StatsCardProps) {
    const showTrend = trend !== undefined && change !== undefined

    const trendStyle = showTrend ? getTrendStyle(trend) : null

    return (
        <Card
            onClick={onClick}
            className={cn(
                "p-4 transition-all duration-200 hover:shadow-sm",
                onClick && "cursor-pointer",
                className
            )}
        >
            <div className="flex items-center gap-3">
                {icon && (
                    <div
                        className={cn(
                            "flex size-12 shrink-0 items-center justify-center rounded-full",
                            iconBg
                        )}
                    >
                        <div className={iconColor}>{icon}</div>
                    </div>
                )}

                <div className="min-w-0 flex-1">
                    <p className="text-sm text-muted-foreground">{title}</p>

                    <h3
                        className={cn("mt-1 text-2xl font-bold tracking-tight", valueColor)}
                    >
                        {value}
                    </h3>

                    <div className="flex gap-2 mt-2">
                        {showTrend && trendStyle && (
                            <div className="flex items-center gap-1 text-xs">
                                {trend === "increase" ? (
                                    <ArrowUpRight className={cn("size-3.5", trendStyle.text)} />
                                ) : (
                                    <ArrowDownRight className={cn("size-3.5", trendStyle.text)} />
                                )}

                                <span className={cn("font-medium", trendStyle.text)}>
                                    {change}%
                                </span>
                            </div>
                        )}

                        {subtitle && (
                            <p className="text-xs text-muted-foreground">{subtitle}</p>
                        )}
                    </div>

                    {footer && <div className="mt-3">{footer}</div>}
                </div>
            </div>
        </Card>
    )
})
