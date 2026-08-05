"use client"

import { format } from "date-fns"

import {
    CalendarDays,
    FileText,
    Images,
    ListOrdered,
    Type,
    UserRound,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

import type { Gallery } from "@/types/gallery"

interface GalleryInformationCardProps {
    gallery: Gallery
}

export function GalleryInformationCard({
    gallery,
}: GalleryInformationCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Gallery Information</CardTitle>

                <CardDescription>
                    Complete information about this gallery.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-1">
                <InfoRow
                    icon={<Type className="size-4 text-primary" />}
                    label="Title"
                    value={gallery.title}
                />

                <Separator />

                <InfoRow
                    icon={<FileText className="size-4 text-chart-1" />}
                    label="Description"
                    value={
                        <p className="max-w-lg text-right leading-6 whitespace-pre-wrap">
                            {gallery.description || "No description provided."}
                        </p>
                    }
                />

                <Separator />

                <InfoRow
                    icon={<Images className="size-4 text-chart-2" />}
                    label="Images"
                    value={
                        <Badge variant="secondary">{gallery.images.length} Images</Badge>
                    }
                />

                <Separator />

                <InfoRow
                    icon={<ListOrdered className="size-4 text-chart-3" />}
                    label="Display Order"
                    value={`#${gallery.order}`}
                />

                <Separator />

                <InfoRow
                    icon={<UserRound className="size-4 text-chart-4" />}
                    label="Created By"
                    value={gallery.createdBy?.name ?? "System"}
                />

                <Separator />

                <InfoRow
                    icon={<UserRound className="size-4 text-chart-5" />}
                    label="Updated By"
                    value={gallery.updatedBy?.name ?? "System"}
                />

                <Separator />

                <InfoRow
                    icon={<CalendarDays className="size-4 text-primary" />}
                    label="Created At"
                    value={format(new Date(gallery.createdAt), "dd MMM yyyy, hh:mm a")}
                />

                <Separator />

                <InfoRow
                    icon={<CalendarDays className="size-4 text-chart-2" />}
                    label="Updated At"
                    value={format(new Date(gallery.updatedAt), "dd MMM yyyy, hh:mm a")}
                />
            </CardContent>
        </Card>
    )
}

interface InfoRowProps {
    icon: React.ReactNode
    label: string
    value: React.ReactNode
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-start justify-between gap-8 py-4">
            <div className="flex min-w-0 items-center gap-3">
                <div className="shrink-0">{icon}</div>

                <span className="text-sm font-medium text-muted-foreground">
                    {label}
                </span>
            </div>

            <div className="max-w-xl text-right text-sm font-medium wrap-break-word">
                {value}
            </div>
        </div>
    )
}
