// src/features/prayer-time/components/PrayerTimeForm.tsx

"use client"

import { Sunrise, Sun, Sunset, CalendarDays } from "lucide-react"
import { Controller, type UseFormReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"

import type { PrayerTimeFormValues } from "@/schemas/prayer-time.schema"

interface PrayerTimeFormProps {
    form: UseFormReturn<PrayerTimeFormValues>
    onSubmit: (values: PrayerTimeFormValues) => Promise<void>
    formId: string
}

const PRAYER_GROUPS: {
    title: string
    icon: React.ReactNode
    fields: { name: keyof PrayerTimeFormValues; label: string }[]
}[] = [
    {
        title: "Dawn",
        icon: <Sunrise className="size-4" />,
        fields: [
            { name: "fajr", label: "Fajr" },
            { name: "sunrise", label: "Sunrise" },
        ],
    },
    {
        title: "Midday & Afternoon",
        icon: <Sun className="size-4" />,
        fields: [
            { name: "dhuhr", label: "Dhuhr" },
            { name: "asr", label: "Asr" },
        ],
    },
    {
        title: "Evening & Night",
        icon: <Sunset className="size-4" />,
        fields: [
            { name: "maghrib", label: "Maghrib" },
            { name: "isha", label: "Isha" },
        ],
    },
    {
        title: "Weekly",
        icon: <CalendarDays className="size-4" />,
        fields: [{ name: "jummah", label: "Jummah" }],
    },
]

export function PrayerTimeForm({ form, onSubmit, formId }: PrayerTimeFormProps) {
    return (
        <form
            id={formId}
            className="space-y-7"
            onSubmit={form.handleSubmit(onSubmit)}
        >
            {PRAYER_GROUPS.map((group, groupIndex) => (
                <div key={group.title}>
                    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        {group.icon}
                        {group.title}
                    </div>

                    <FieldGroup className="grid gap-5 sm:grid-cols-2">
                        {group.fields.map(({ name, label }) => (
                            <Controller
                                key={name}
                                name={name}
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={`${formId}-${name}`}>
                                            {label}
                                        </FieldLabel>

                                        <Input
                                            {...field}
                                            type="time"
                                            id={`${formId}-${name}`}
                                            aria-invalid={fieldState.invalid}
                                            autoComplete="off"
                                            className="tabular-nums"
                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        ))}
                    </FieldGroup>

                    {groupIndex !== PRAYER_GROUPS.length - 1 && (
                        <Separator className="mt-7" />
                    )}
                </div>
            ))}
        </form>
    )
}