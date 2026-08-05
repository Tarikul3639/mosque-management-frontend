"use client"

import {
    CircleDashed,
    CirclePlay,
    CircleCheckBig,
    CircleX,
    Wallet,
    HandCoins,
} from "lucide-react"

import {
    StatsCard,
    StatsCardsSkeletonMap,
} from "@/components/common/stats-card"
import type { ProjectSummary } from "@/types/project"

interface ProjectSummaryCardsProps {
    isLoading: boolean
    summary?: ProjectSummary
}

export function ProjectSummaryCards({
    isLoading,
    summary,
}: ProjectSummaryCardsProps) {
    if (isLoading) {
        return <StatsCardsSkeletonMap count={7} />
    }

    const {
        totalProjects = 0,
        planningProjects = 0,
        runningProjects = 0,
        completedProjects = 0,
        cancelledProjects = 0,
        totalBudget = 0,
        totalSpent = 0,
    } = summary ?? {}

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
                title="Total Projects"
                value={totalProjects}
                subtitle="All projects"
                icon={<CircleDashed className="size-5" />}
            />

            <StatsCard
                title="Planning"
                value={planningProjects}
                subtitle="Projects awaiting execution"
                icon={<CircleDashed className="size-5" />}
                iconBg="bg-slate-500/10"
                iconColor="text-slate-600"
            />

            <StatsCard
                title="Running"
                value={runningProjects}
                subtitle="Currently active projects"
                icon={<CirclePlay className="size-5" />}
                iconBg="bg-blue-500/10"
                iconColor="text-blue-600"
            />

            <StatsCard
                title="Completed"
                value={completedProjects}
                subtitle="Successfully finished"
                icon={<CircleCheckBig className="size-5" />}
                iconBg="bg-green-500/10"
                iconColor="text-green-600"
            />

            <StatsCard
                title="Cancelled"
                value={cancelledProjects}
                subtitle="Cancelled projects"
                icon={<CircleX className="size-5" />}
                iconBg="bg-red-500/10"
                iconColor="text-red-600"
            />

            <StatsCard
                title="Total Budget"
                value={`৳ ${totalBudget.toLocaleString()}`}
                subtitle="Allocated budget"
                icon={<Wallet className="size-5" />}
                iconBg="bg-violet-500/10"
                iconColor="text-violet-600"
            />

            <StatsCard
                title="Total Spent"
                value={`৳ ${totalSpent.toLocaleString()}`}
                subtitle="Amount already spent"
                icon={<HandCoins className="size-5" />}
                iconBg="bg-amber-500/10"
                iconColor="text-amber-600"
            />
        </div>
    )
}
