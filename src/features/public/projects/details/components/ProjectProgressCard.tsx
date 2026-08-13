import { CheckCircle2, CircleDollarSign, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import type { Project } from "@/types/project"

interface ProjectProgressCardProps {
  project: Project
}

export function ProjectProgressCard({ project }: ProjectProgressCardProps) {
  const budget = Number(project.budget)
  const spent = Number(project.spent)

  const remaining = Math.max(budget - spent, 0)

  const spentPercentage =
    budget > 0 ? Math.min(Math.round((spent / budget) * 100), 100) : 0

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <TrendingUp className="size-4.5" />
          </div>

          <div>
            <CardTitle className="text-base">প্রকল্পের অগ্রগতি</CardTitle>

            <p className="mt-1 text-xs text-muted-foreground">
              প্রকল্পের বর্তমান কাজ ও আর্থিক অগ্রগতি
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Project Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">কাজের অগ্রগতি</span>

            <span className="text-lg font-semibold">{project.progress}%</span>
          </div>

          <Progress value={project.progress} className="h-2.5" />

          {project.progress >= 100 && (
            <div className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 className="size-4" />
              প্রকল্পের কাজ সম্পন্ন হয়েছে
            </div>
          )}
        </div>

        {/* Financial Progress */}
        <div className="border-t pt-5">
          <div className="mb-4 flex items-center gap-2">
            <CircleDollarSign className="size-4 text-muted-foreground" />

            <span className="text-sm font-medium">আর্থিক অগ্রগতি</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ব্যয়ের হার</span>

              <span className="font-medium">{spentPercentage}%</span>
            </div>

            <Progress value={spentPercentage} className="h-2" />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <FinancialItem label="বাজেট" value={budget} />

            <FinancialItem label="ব্যয়" value={spent} />

            <FinancialItem label="অবশিষ্ট" value={remaining} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                             Financial Item                                 */
/* -------------------------------------------------------------------------- */

interface FinancialItemProps {
  label: string
  value: number
}

function FinancialItem({ label, value }: FinancialItemProps) {
  return (
    <div className="rounded-lg bg-muted/50 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm font-semibold">
        ৳{value.toLocaleString("bn-BD")}
      </p>
    </div>
  )
}
