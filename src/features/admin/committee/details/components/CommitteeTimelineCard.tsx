"use client"

import { format } from "date-fns"

import { CalendarClock, CalendarPlus, CalendarX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CommitteeMember } from "@/types/committee"

interface CommitteeTimelineCardProps {
  member: CommitteeMember
}

export function CommitteeTimelineCard({ member }: CommitteeTimelineCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <TimelineItem
          icon={<CalendarPlus className="size-5" />}
          title="Joined Committee"
          value={format(new Date(member.joiningDate), "dd MMM yyyy")}
        />

        <TimelineItem
          icon={<CalendarX className="size-5" />}
          title="End Date"
          value={
            member.endDate
              ? format(new Date(member.endDate), "dd MMM yyyy")
              : "Current Member"
          }
        />

        <TimelineItem
          icon={<CalendarClock className="size-5" />}
          title="Created"
          value={format(new Date(member.createdAt), "dd MMM yyyy, hh:mm a")}
        />

        <TimelineItem
          icon={<CalendarClock className="size-5" />}
          title="Last Updated"
          value={format(new Date(member.updatedAt), "dd MMM yyyy, hh:mm a")}
        />
      </CardContent>
    </Card>
  )
}

interface TimelineItemProps {
  icon: React.ReactNode
  title: string
  value: string
}

function TimelineItem({ icon, title, value }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
    </div>
  )
}
