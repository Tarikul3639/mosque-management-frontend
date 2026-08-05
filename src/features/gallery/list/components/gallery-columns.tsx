"use client"

import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { formatDate } from "@/utils/format-date"
import { Calendar, Images, ListOrdered, UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/common/data-table"
import type { Gallery } from "@/types/gallery"
import { GalleryTableActions } from "./GalleryTableActions"

export const galleryColumns: ColumnDef<Gallery>[] = [
    {
        accessorKey: "title",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gallery" />
        ),

        cell: ({ row }) => {
            const gallery = row.original

            return (
                <div className="flex items-center gap-3">
                    <div className="size-14 overflow-hidden rounded-lg border bg-muted">
                        {gallery.images[0] ? (
                            <img
                                src={gallery.images[0].url}
                                alt={gallery.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <Images className="size-6 text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-1">
                        <Link
                            href={`/galleries/${gallery.id}`}
                            className="font-medium hover:underline"
                        >
                            {gallery.title}
                        </Link>

                        {gallery.description && (
                            <p className="line-clamp-1 max-w-xs text-xs text-muted-foreground">
                                {gallery.description}
                            </p>
                        )}
                    </div>
                </div>
            )
        },
    },

    {
        id: "images",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Images" />
        ),

        accessorFn: (row) => row.images.length,

        cell: ({ row }) => (
            <Badge variant="secondary">
                <Images className="mr-1 size-3.5" />
                {row.original.images.length}
            </Badge>
        ),
    },

    {
        accessorKey: "order",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Order" />
        ),

        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <ListOrdered className="size-4 text-chart-2" />

                <span className="font-medium">{row.original.order}</span>
            </div>
        ),
    },

    {
        id: "createdBy",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created By" />
        ),

        accessorFn: (row) => row.createdBy?.name ?? "",

        cell: ({ row }) =>
            row.original.createdBy ? (
                <div className="flex items-center gap-2">
                    <UserRound className="size-4 text-chart-3" />

                    {row.original.createdBy.name}
                </div>
            ) : (
                "—"
            ),
    },

    {
        accessorKey: "createdAt",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created" />
        ),

        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Calendar className="size-4 text-chart-5" />

                {formatDate(new Date(row.original.createdAt))}
            </div>
        ),
    },

    {
        id: "actions",

        enableSorting: false,
        enableHiding: false,
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),

        cell: ({ row }) => <GalleryTableActions gallery={row.original} />,
    },
]
