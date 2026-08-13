import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  UserRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import type { Project } from "@/types/project"

interface ProjectInfoCardProps {
  project: Project
}

export function ProjectInfoCard({ project }: ProjectInfoCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FileText className="size-5" />
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {project.title}
              </h1>

              <p className="mt-1 text-sm text-muted-foreground">
                প্রকল্পের বিস্তারিত তথ্য
              </p>
            </div>
          </div>

          <ProjectStatusBadge status={project.status} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-5 sm:p-6">
        {/* Description */}
        {project.description && (
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <FileText className="size-4 text-muted-foreground" />
              বিবরণ
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              {project.description}
            </p>
          </div>
        )}

        {/* Financial information */}
        <div className="grid gap-4 sm:grid-cols-2">
          <InfoItem
            icon={<CircleDollarSign className="size-4" />}
            label="মোট বাজেট"
            value={`৳${project.budget.toLocaleString("bn-BD")}`}
          />

          <InfoItem
            icon={<CircleDollarSign className="size-4" />}
            label="মোট ব্যয়"
            value={`৳${project.spent.toLocaleString("bn-BD")}`}
          />
        </div>

        {/* Dates & creator */}
        <div className="grid gap-4 border-t pt-5 sm:grid-cols-2">
          {project.startDate && (
            <InfoItem
              icon={<CalendarDays className="size-4" />}
              label="শুরুর তারিখ"
              value={formatDate(project.startDate)}
            />
          )}

          {project.endDate && (
            <InfoItem
              icon={<CalendarDays className="size-4" />}
              label="সমাপ্তির তারিখ"
              value={formatDate(project.endDate)}
            />
          )}

          {project.createdBy && (
            <InfoItem
              icon={<UserRound className="size-4" />}
              label="তৈরি করেছেন"
              value={project.createdBy.name}
            />
          )}
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                                Info Item                                   */
/* -------------------------------------------------------------------------- */

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>

        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Status Badge                                  */
/* -------------------------------------------------------------------------- */

function ProjectStatusBadge({ status }: { status: Project["status"] }) {
  switch (status) {
    case "PLANNING":
      return <Badge variant="secondary">পরিকল্পনাধীন</Badge>

    case "RUNNING":
      return <Badge className="bg-blue-600 hover:bg-blue-600">চলমান</Badge>

    case "COMPLETED":
      return (
        <Badge className="bg-emerald-600 hover:bg-emerald-600">সম্পন্ন</Badge>
      )

    case "CANCELLED":
      return <Badge variant="destructive">বাতিল</Badge>

    default:
      return <Badge variant="outline">{status}</Badge>
  }
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
