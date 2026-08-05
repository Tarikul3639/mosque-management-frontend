"use client"

import { format } from "date-fns"
import { CalendarDays, FileText, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import {
    PROJECT_STATUS_CONFIG,
    getProjectStatusLabel,
} from "@/constants/project-status"

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
                <CardTitle>Project Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
                <InfoItem
                    icon={<FileText className="size-4" />}
                    label="Title"
                    value={project.title}
                />

                <InfoItem
                    icon={<FileText className="size-4" />}
                    label="Description"
                    value={project.description ?? "No description available."}
                />

                <InfoItem
                    icon={<CalendarDays className="size-4" />}
                    label="Status"
                    value={
                        <Badge
                            variant="outline"
                            className={PROJECT_STATUS_CONFIG[project.status].className}
                        >
                            {getProjectStatusLabel(project.status)}
                        </Badge>
                    }
                />

                <InfoItem
                    icon={<User className="size-4" />}
                    label="Created By"
                    value={project.createdBy?.name ?? "System"}
                />

                <InfoItem
                    icon={<User className="size-4" />}
                    label="Updated By"
                    value={project.updatedBy?.name ?? "—"}
                />

                <InfoItem
                    icon={<CalendarDays className="size-4" />}
                    label="Created"
                    value={format(new Date(project.createdAt), "dd MMM yyyy")}
                />

                <InfoItem
                    icon={<CalendarDays className="size-4" />}
                    label="Updated"
                    value={format(new Date(project.updatedAt), "dd MMM yyyy")}
                />
            </CardContent>
        </Card>
    )
}

interface InfoItemProps {
    icon: React.ReactNode
    label: string
    value: React.ReactNode
}

function InfoItem({ icon, label, value }: InfoItemProps) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 text-muted-foreground">{icon}</div>

            <div className="flex-1">
                <p className="text-xs text-muted-foreground">{label}</p>

                <div className="mt-1 text-sm font-medium">{value}</div>
            </div>
        </div>
    )
}
