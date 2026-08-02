// src/features/expenses/details/components/ExpenseTimelineCard.tsx

"use client";

import {
    CalendarClock,
    Clock3,
    History,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { formatDate } from "@/utils/format-date";

import type { Expense } from "@/types/expense";

interface ExpenseTimelineCardProps {
    expense: Expense;
}

export function ExpenseTimelineCard({
    expense,
}: ExpenseTimelineCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>
                    Timeline
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="mx-auto flex max-w-sm flex-col">
                    <TimelineItem
                        icon={
                            <History className="size-5" />
                        }
                        title="Expense Date"
                        value={formatDate(
                            expense.expenseDate,
                        )}
                    />

                    <TimelineItem
                        icon={
                            <CalendarClock className="size-5" />
                        }
                        title="Created At"
                        value={formatDate(
                            expense.createdAt,
                        )}
                    />

                    <TimelineItem
                        icon={
                            <Clock3 className="size-5" />
                        }
                        title="Last Updated"
                        value={formatDate(
                            expense.updatedAt,
                        )}
                        isLast
                    />
                </div>
            </CardContent>
        </Card>
    );
}

interface TimelineItemProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    isLast?: boolean;
}

function TimelineItem({
    icon,
    title,
    value,
    isLast = false,
}: TimelineItemProps) {
    return (
        <div className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
                <div className="absolute left-5 top-10 h-[calc(100%-1rem)] w-px bg-border" />
            )}

            <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background">
                {icon}
            </div>

            <div className="flex min-h-10 flex-1 flex-col justify-center">
                <h4 className="text-sm font-medium">
                    {title}
                </h4>

                <p className="mt-1 text-sm text-muted-foreground">
                    {value}
                </p>
            </div>
        </div>
    );
}