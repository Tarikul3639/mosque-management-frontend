"use client"

import { format } from "date-fns"

import {
  CalendarDays,
  Clock3,
  FileText,
  FolderKanban,
  UserCircle2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

import type { Project } from "@/types/project"

interface ProjectInformationCardProps {
  project: Project
}

export function ProjectInformationCard({
  project,
}: ProjectInformationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Project Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-4">
          <InfoItem
            icon={<FolderKanban className="size-4" />}
            label="Project Title"
            value={project.title}
          />

          <Separator />

          <InfoItem
            icon={<FileText className="size-4" />}
            label="Description"
            value={
              project.description ??
              "No description available."
            }
          />

          <Separator />

          <InfoItem
            icon={<CalendarDays className="size-4" />}
            label="Created"
            value={format(
              new Date(project.createdAt),
              "dd MMM yyyy, hh:mm a",
            )}
          />

          <Separator />

          <InfoItem
            icon={<Clock3 className="size-4" />}
            label="Last Updated"
            value={format(
              new Date(project.updatedAt),
              "dd MMM yyyy, hh:mm a",
            )}
          />

          <Separator />

          <InfoItem
            icon={<UserCircle2 className="size-4" />}
            label="Created By"
            value={
              project.createdBy?.name ??
              "System"
            }
          />

          <Separator />

          <InfoItem
            icon={<UserCircle2 className="size-4" />}
            label="Updated By"
            value={
              project.updatedBy?.name ??
              "System"
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}

interface InfoItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-md bg-primary/10 p-2 text-primary">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 wrap-break-word text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  )
}