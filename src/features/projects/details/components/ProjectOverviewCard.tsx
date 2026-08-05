"use client"

import { PiggyBank, TrendingUp, Wallet } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import { Currency } from "@/components/common/currency"

import {
  getProjectStatusLabel,
  PROJECT_STATUS_CONFIG,
} from "@/constants/project-status"

import type { Project } from "@/types/project"

interface ProjectOverviewCardProps {
  project: Project
}

export function ProjectOverviewCard({ project }: ProjectOverviewCardProps) {
  const remaining = Math.max(project.budget - project.spent, 0)

  const budgetUsed =
    project.budget > 0 ? Math.round((project.spent / project.budget) * 100) : 0

  const status = PROJECT_STATUS_CONFIG[project.status]

  const StatusIcon = status.icon

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Project Overview</CardTitle>

        <Badge variant="outline" className={status.className}>
          <StatusIcon className="mr-1 size-3.5" />

          {getProjectStatusLabel(project.status)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Progress */}

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>

            <span className="font-semibold">{project.progress}%</span>
          </div>

          <Progress value={project.progress} className="h-2" />
        </div>

        {/* Budget Usage */}

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Budget Utilization</span>

            <span className="font-semibold">{budgetUsed}%</span>
          </div>

          <Progress value={budgetUsed} className="h-2" />
        </div>

        {/* Budget Summary */}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <Wallet className="size-4 text-primary" />

              <span className="text-xs">Budget</span>
            </div>

            <div className="text-lg font-bold">
              <Currency amount={project.budget} />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="size-4 text-chart-2" />

              <span className="text-xs">Spent</span>
            </div>

            <div className="text-lg font-bold">
              <Currency amount={project.spent} />
            </div>
          </div>

          <div className="rounded-lg border bg-muted/30 p-3">
            <div className="mb-2 flex items-center gap-2 text-muted-foreground">
              <PiggyBank className="size-4 text-success" />

              <span className="text-xs">Remaining</span>
            </div>

            <div className="text-lg font-bold">
              <Currency amount={remaining} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
