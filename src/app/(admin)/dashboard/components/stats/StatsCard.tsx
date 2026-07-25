"use client";

import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string;
    change: string;
    subtitle?: string;
    icon: React.ReactNode;

    iconBg: string;
    iconColor: string;
}

export function StatsCard({
    title,
    value,
    change,
    subtitle = "from last month",
    icon,
    iconBg,
    iconColor,
}: StatsCardProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between gap-4">
                <div
                    className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full",
                        iconBg
                    )}
                >
                    <div className={iconColor}>{icon}</div>
                </div>

                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h3 className="mt-1 text-3xl font-bold tracking-tight">
                        {value}
                    </h3>

                    <div className="mt-2 flex items-center gap-1 text-sm">
                        <ArrowUpRight className="h-4 w-4 text-primary" />

                        <span className="font-medium text-primary">
                            {change}
                        </span>

                        <span className="text-muted-foreground">
                            {subtitle}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}