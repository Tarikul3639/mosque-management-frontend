"use client"

import { format, parse } from "date-fns"

import { CalendarDays, Clock3, Fingerprint } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

import type { PrayerTime } from "@/types/prayer-time"

interface PrayerTimeInformationCardProps {
    prayerTime: PrayerTime
}

// "HH:mm" (24hr) string ke "hh:mm a" (12hr AM/PM) e convert kore
function formatTime(time: string | null | undefined): string {
    if (!time) return "—"

    try {
        const parsed = parse(time, "HH:mm", new Date())
        return format(parsed, "hh:mm a")
    } catch {
        return time
    }
}

export function PrayerTimeInformationCard({
    prayerTime,
}: PrayerTimeInformationCardProps) {
    const prayerTimes = [
        {
            label: "Fajr",
            value: formatTime(prayerTime.fajr),
        },
        {
            label: "Sunrise",
            value: formatTime(prayerTime.sunrise),
        },
        {
            label: "Dhuhr",
            value: formatTime(prayerTime.dhuhr),
        },
        {
            label: "Asr",
            value: formatTime(prayerTime.asr),
        },
        {
            label: "Maghrib",
            value: formatTime(prayerTime.maghrib),
        },
        {
            label: "Isha",
            value: formatTime(prayerTime.isha),
        },
        {
            label: "Jummah",
            value: formatTime(prayerTime.jummah),
        },
    ]

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Daily Prayer Schedule</CardTitle>

                    <CardDescription>
                        Current prayer times configured for the mosque.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-1">
                    {prayerTimes.map((prayer, index) => (
                        <div key={prayer.label}>
                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-2">
                                    <Clock3 className="size-4 text-primary" />

                                    <span className="text-sm font-medium">{prayer.label}</span>
                                </div>

                                <span className="font-semibold">{prayer.value}</span>
                            </div>

                            {index !== prayerTimes.length - 1 && <Separator />}
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Information</CardTitle>

                    <CardDescription>
                        General information about this prayer schedule.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-1">
                    <InfoRow
                        icon={<Fingerprint className="size-4 text-primary" />}
                        label="Prayer Time ID"
                        value={prayerTime.id}
                    />

                    <Separator />

                    <InfoRow
                        icon={<CalendarDays className="size-4 text-chart-2" />}
                        label="Created At"
                        value={format(
                            new Date(prayerTime.createdAt),
                            "dd MMM yyyy, hh:mm a"
                        )}
                    />

                    <Separator />

                    <InfoRow
                        icon={<CalendarDays className="size-4 text-chart-3" />}
                        label="Last Updated"
                        value={format(
                            new Date(prayerTime.updatedAt),
                            "dd MMM yyyy, hh:mm a"
                        )}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

interface InfoRowProps {
    icon: React.ReactNode

    label: string

    value: React.ReactNode
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
                {icon}

                <span className="text-sm text-muted-foreground">{label}</span>
            </div>

            <span className="max-w-55 truncate text-right text-sm font-medium">
                {value}
            </span>
        </div>
    )
}