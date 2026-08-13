import {
  CalendarCheck2,
  CalendarDays,
  CircleCheck,
  CircleDot,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { ProjectStatus } from "@/constants/project-status"

interface ProjectTimelineProps {
  startDate: string | null
  endDate: string | null
  status: ProjectStatus
  createdAt: string
}

export function ProjectTimeline({
  startDate,
  endDate,
  status,
  createdAt,
}: ProjectTimelineProps) {
  const isCompleted = status === "COMPLETED"
  const isCancelled = status === "CANCELLED"

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CalendarDays className="size-4.5" />
          </div>

          <div>
            <CardTitle className="text-base">প্রকল্পের সময়রেখা</CardTitle>

            <p className="mt-1 text-xs text-muted-foreground">
              প্রকল্পের গুরুত্বপূর্ণ তারিখসমূহ
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative ml-1">
          {/* Vertical line */}
          <div className="absolute top-2 bottom-2 left-4 w-px bg-border" />

          <div className="relative space-y-7">
            <TimelineItem
              icon={<CircleDot className="size-4" />}
              title="প্রকল্প যোগ করা হয়েছে"
              date={createdAt}
              description="সিস্টেমে প্রকল্পটি নিবন্ধন করা হয়েছে।"
            />

            {startDate && (
              <TimelineItem
                icon={<CalendarCheck2 className="size-4" />}
                title="প্রকল্প শুরু"
                date={startDate}
                description="প্রকল্পের কাজ শুরু হয়েছে।"
              />
            )}

            {endDate && (
              <TimelineItem
                icon={
                  isCompleted ? (
                    <CircleCheck className="size-4" />
                  ) : (
                    <CalendarDays className="size-4" />
                  )
                }
                title={isCompleted ? "প্রকল্প সম্পন্ন" : "সমাপ্তির তারিখ"}
                date={endDate}
                description={
                  isCompleted
                    ? "প্রকল্পের কাজ সফলভাবে সম্পন্ন হয়েছে।"
                    : "প্রকল্পটি সম্পন্ন করার নির্ধারিত তারিখ।"
                }
              />
            )}

            {isCancelled && (
              <TimelineItem
                icon={<CircleDot className="size-4" />}
                title="প্রকল্প বাতিল"
                date={null}
                description="এই প্রকল্পটি বর্তমানে বাতিল করা হয়েছে।"
                badge={<Badge variant="destructive">বাতিল</Badge>}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Timeline Item                                 */
/* -------------------------------------------------------------------------- */

interface TimelineItemProps {
  icon: React.ReactNode
  title: string
  date: string | null
  description: string
  badge?: React.ReactNode
}

function TimelineItem({
  icon,
  title,
  date,
  description,
  badge,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-4">
      {/* Icon */}
      <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border bg-background text-primary">
        {icon}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-medium">{title}</h3>

          {badge}
        </div>

        {date && (
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDate(date)}
          </p>
        )}

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Date Helper                                 */
/* -------------------------------------------------------------------------- */

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
