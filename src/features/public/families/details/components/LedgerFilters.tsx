"use client"

import { X } from "lucide-react"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { MONTHS, YEARS } from "@/constants/date"

export function LedgerFilters() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const yearValue = searchParams.get("year") ?? "all"
    const monthValue = searchParams.get("month") ?? "all"
    const hasActiveFilters = yearValue !== "all" || monthValue !== "all"

    const updateQuery = (key: "year" | "month", value: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (value === "all") {
            params.delete(key)
        } else {
            params.set(key, value)
        }

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        })
    }

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        params.delete("year")
        params.delete("month")

        router.replace(`${pathname}?${params.toString()}`, {
            scroll: false,
        })
    }

    return (
        <div className="mb-5 flex flex-row flex-wrap items-center gap-3">
            <Select
                value={yearValue}
                onValueChange={(value) => updateQuery("year", value)}
            >
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="বছর নির্বাচন করুন" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>বছর</SelectLabel>
                        <SelectSeparator />
                        <SelectItem value="all">সকল বছর</SelectItem>

                        {YEARS.map((year) => (
                            <SelectItem key={year.value} value={String(year.value)}>
                                {year.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select
                value={monthValue}
                onValueChange={(value) => updateQuery("month", value)}
            >
                <SelectTrigger className="w-32">
                    <SelectValue placeholder="মাস নির্বাচন করুন" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>মাস</SelectLabel>
                        <SelectSeparator />
                        <SelectItem value="all">সকল মাস</SelectItem>

                        {MONTHS.map((month) => (
                            <SelectItem key={month.value} value={String(month.value)}>
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {hasActiveFilters && (
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={clearFilters}
                >
                    <X className="size-3.5" />
                    ফিল্টার মুছুন
                </Button>
            )}
        </div>
    )
}