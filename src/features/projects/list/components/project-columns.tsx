"use client"

import { format } from "date-fns"
import Link from "next/link"

import type { ColumnDef } from "@tanstack/react-table"

import { ImageIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import { DataTableColumnHeader } from "@/components/common/data-table"

import {
    getProjectStatusLabel,
    PROJECT_STATUS_CONFIG,
} from "@/constants/project-status"

import type { Project } from "@/types/project"
import { Currency } from "@/components/common/currency"
import { ProjectTableActions } from "./ProjectTableActions"

export const projectColumns: ColumnDef<Project>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Project" />
        ),
        cell: ({ row }) => {
            const project = row.original

            return (
                <div className="max-w-75">
                    <Link
                        href={`/projects/${project.id}`}
                        className="line-clamp-1 font-semibold hover:text-primary"
                    >
                        {project.title}
                    </Link>

                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                        {project.description ?? "No description available."}
                    </p>
                </div>
            )
        },
    },

    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className={PROJECT_STATUS_CONFIG[row.original.status].className}
            >
                {getProjectStatusLabel(row.original.status)}
            </Badge>
        ),
    },

    {
        id: "budget",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Budget & Spent" />
        ),
        cell: ({ row }) => {
            const project = row.original

            return (
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                        <Currency amount={project.budget} className="text-sm font-medium" />
                    </div>

                    <div className="text-xs text-muted-foreground">
                        Spent:{" "}
                        <Currency
                            amount={project.spent}
                            className="font-medium text-orange-600"
                        />
                    </div>
                </div>
            )
        },
    },

    {
        accessorKey: "progress",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Progress" />
        ),
        cell: ({ row }) => {
            const progress = row.original.progress

            return (
                <div className="w-32.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            )
        },
    },

    {
        id: "images",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Media" />
        ),
        cell: ({ row }) => {
            const images = row.original.images

            if (!images.length) {
                return <span className="text-muted-foreground">—</span>
            }

            return (
                <div className="flex items-center gap-2">
                    <Avatar className="size-8 rounded-md">
                        <AvatarImage src={images[0].url} />
                        <AvatarFallback className="rounded-md">
                            <ImageIcon className="size-3.5" />
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                        {images.length} {images.length > 1 ? "Images" : "Image"}
                    </span>
                </div>
            )
        },
    },

    {
        id: "timeline",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Timeline" />
        ),
        cell: ({ row }) => {
            const project = row.original

            return (
                <div className="space-y-0.5 text-xs">
                    <div className="text-muted-foreground">
                        Start:{" "}
                        <span className="font-medium text-foreground">
                            {project.startDate
                                ? format(new Date(project.startDate), "dd MMM yyyy")
                                : "—"}
                        </span>
                    </div>
                    <div className="text-muted-foreground">
                        End:{" "}
                        <span className="font-medium text-foreground">
                            {project.endDate
                                ? format(new Date(project.endDate), "dd MMM yyyy")
                                : "Running"}
                        </span>
                    </div>
                </div>
            )
        },
    },

    {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => <ProjectTableActions project={row.original} />,
    },
]
