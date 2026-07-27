"use client";

import {
    TrendingUp,
    UserCheck,
    UserX,
    Users,
} from "lucide-react";

import {
    StatsCard,
    StatsCardsSkeletonMap,
} from "@/components/common/stats-card";

import type { FamilyStats } from "@/store/api/family.api";

interface FamilyStatsSectionProps {
    familyStats?: FamilyStats;
    isLoading: boolean;
}

export function FamilyStatsSection({
    familyStats,
    isLoading,
}: FamilyStatsSectionProps) {
    if (isLoading || !familyStats) {
        return <StatsCardsSkeletonMap count={4} />;
    }

    const stats = [
        {
            title: "Total Families",
            value: familyStats.totalFamilies,
            subtitle: "Registered families",
            icon: <Users className="size-5" />,
            iconBg: "bg-chart-1/15",
            iconColor: "text-chart-1",
        },
        {
            title: "Active Families",
            value: familyStats.activeFamilies,
            subtitle: "Currently active",
            icon: <UserCheck className="size-5" />,
            iconBg: "bg-chart-2/15",
            iconColor: "text-chart-2",
        },
        {
            title: "Inactive Families",
            value: familyStats.inactiveFamilies,
            subtitle: "Currently inactive",
            icon: <UserX className="size-5" />,
            iconBg: "bg-chart-3/15",
            iconColor: "text-chart-3",
        },
        {
            title: "New This Month",
            value: familyStats.newFamiliesThisMonth,
            subtitle: "Added this month",
            icon: <TrendingUp className="size-5" />,
            iconBg: "bg-chart-4/15",
            iconColor: "text-chart-4",
        },
    ];

    return (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <StatsCard
                    key={stat.title}
                    {...stat}
                />
            ))}
        </section>
    );
}