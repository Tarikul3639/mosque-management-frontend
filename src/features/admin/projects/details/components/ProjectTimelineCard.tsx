"use client"

import { format } from "date-fns"
import { CalendarDays, Clock3, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/types/project"
import { formatDate } from "@/utils/format-date"

interface ProjectTimelineCardProps {
  project: Project
}

export function ProjectTimelineCard({ project }: ProjectTimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <TimelineItem
          icon={<CalendarDays className="size-4 text-primary" />}
          title="Start Date"
          value={formatDate(project.startDate)}
        />

        <TimelineItem
          icon={<CalendarDays className="size-4 text-destructive" />}
          title="End Date"
          value={project.endDate ? formatDate(project.endDate) : "Running"}
        />

        <TimelineItem
          icon={<Clock3 className="size-4 text-chart-2" />}
          title="Created At"
          value={format(new Date(project.createdAt), "dd MMM yyyy • hh:mm a")}
        />

        <TimelineItem
          icon={<Clock3 className="size-4 text-chart-5" />}
          title="Updated At"
          value={format(new Date(project.updatedAt), "dd MMM yyyy • hh:mm a")}
        />

        <TimelineItem
          icon={<User className="size-4 text-chart-3" />}
          title="Created By"
          value={project.createdBy?.name ?? "System"}
        />

        <TimelineItem
          icon={<User className="size-4 text-chart-4" />}
          title="Updated By"
          value={project.updatedBy?.name ?? "—"}
        />
      </CardContent>
    </Card>
  )
}

interface TimelineItemProps {
  icon: React.ReactNode
  title: string
  value: React.ReactNode
}

function TimelineItem({ icon, title, value }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>

      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{title}</p>
        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}
