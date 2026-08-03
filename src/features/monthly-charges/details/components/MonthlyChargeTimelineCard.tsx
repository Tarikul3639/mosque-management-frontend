// src/features/monthly-charges/details/components/MonthlyChargeTimelineCard.tsx

"use client"

import {
    CalendarCheck,
    CalendarClock,
    CalendarPlus2,
    CalendarSync,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { formatDate } from "@/utils/format-date"

interface Props {
    createdAt: string
    updatedAt: string
    dueDate: string
    paidAt?: string | null
}

export function MonthlyChargeTimelineCard({
    createdAt,
    updatedAt,
    dueDate,
    paidAt,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Timeline</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="relative ml-4 border-l">
                    <TimelineItem
                        title="Created"
                        description="Monthly charge created"
                        date={formatDate(createdAt)}
                        icon={<CalendarPlus2 className="size-4" />}
                    />

                    <TimelineItem
                        title="Due Date"
                        description="Payment deadline"
                        date={formatDate(dueDate)}
                        icon={<CalendarClock className="size-4" />}
                    />

                    {paidAt && (
                        <TimelineItem
                            title="Paid"
                            description="Payment completed"
                            date={formatDate(paidAt)}
                            icon={<CalendarCheck className="size-4" />}
                            success
                        />
                    )}

                    <TimelineItem
                        title="Updated"
                        description="Last modification"
                        date={formatDate(updatedAt)}
                        icon={<CalendarSync className="size-4" />}
                        last
                    />
                </div>
            </CardContent>
        </Card>
    )
}

interface TimelineItemProps {
    title: string
    description: string
    date: string
    icon: React.ReactNode
    success?: boolean
    last?: boolean
}

function TimelineItem({
    title,
    description,
    date,
    icon,
    success = false,
    last = false,
}: TimelineItemProps) {
    return (
        <div className={`relative pl-8 ${last ? "" : "pb-8"}`}>
            <div
                className={`absolute -left-4 flex size-8 items-center justify-center rounded-full border bg-background ${success
                        ? "border-green-500 text-green-600"
                        : "border-primary text-primary"
                    }`}
            >
                {icon}
            </div>

            <div className="space-y-1">
                <h4 className="text-sm font-semibold">{title}</h4>

                <p className="text-xs text-muted-foreground">{description}</p>

                <p className="text-xs font-medium text-muted-foreground">{date}</p>
            </div>
        </div>
    )
}
