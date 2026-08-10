"use client"

import { useState } from "react"
import { Heart, PiggyBank, RotateCcw, TrendingDown, TrendingUp, Users, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"
import { MosqueStatsSkeleton } from "./MosqueStatsSkeleton"

import { useGetDashboardOverviewQuery } from "@/store/api/dashboard.api"

/* ------------------------------ Helpers ------------------------------ */
const bn = (n: number) => n?.toLocaleString("bn-BD") ?? "০"

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1)
const endOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth() + 1, 0)
const daysAgo = (n: number) => {
    const d = new Date()
    d.setDate(d.getDate() - n)
    return d
}

const toISO = (d: Date) => {
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${d.getFullYear()}-${m}-${day}`
}

const PRESETS = [
    { key: "month", label: "এই মাস", range: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
    {
        key: "last",
        label: "গত মাস",
        range: () => {
            const now = new Date()
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
            return { from: lastMonth, to: endOfMonth(lastMonth) }
        },
    },
    { key: "30d", label: "গত ৩০ দিন", range: () => ({ from: daysAgo(30), to: new Date() }) },
    { key: "7d", label: "গত ৭ দিন", range: () => ({ from: daysAgo(7), to: new Date() }) },
]

/* -------------------------------- Component ------------------------------- */
export function MosqueStats() {
    const today = new Date()
    const defaultRange = { from: startOfMonth(today), to: today }

    // State Management
    const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>(defaultRange)
    const [activePreset, setActivePreset] = useState<string>("month")

    // RTK Query hook integration
    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetDashboardOverviewQuery({
        from: toISO(dateRange.from),
        to: toISO(dateRange.to),
    })

    // Handlers
    const handleDateRangeChange = (range: { from: Date; to: Date }, presetKey = "") => {
        setDateRange(range)
        setActivePreset(presetKey)
    }

    const handleClearFilter = () => {
        setDateRange(defaultRange)
        setActivePreset("month")
    }

    const stats = data
        ? [
            { icon: Users, label: "পরিবার", stat: data.families, money: false, filled: false },
            { icon: Heart, label: "মোট দান", stat: data.donations, money: true, filled: true },
            { icon: Wallet, label: "মোট ব্যয়", stat: data.expenses, money: true, filled: true },
            { icon: PiggyBank, label: "ব্যালেন্স", stat: data.balance, money: true, filled: true },
        ]
        : []

    const showLoading = isLoading || isFetching
    const isFiltered = activePreset !== "month"

    return (
        <section className="bg-background px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* ------------------------- Filter Bar ------------------------- */}
                <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    {/* Preset buttons */}
                    <div className="flex flex-wrap items-center gap-2">
                        {PRESETS.map((preset) => (
                            <Button
                                key={preset.key}
                                size="sm"
                                disabled={showLoading}
                                variant={activePreset === preset.key ? "default" : "outline"}
                                onClick={() => handleDateRangeChange(preset.range(), preset.key)}
                            >
                                {preset.label}
                            </Button>
                        ))}

                        {/* Clear Filter Button */}
                        {isFiltered && (
                            <Button
                                size="sm"
                                variant="ghost"
                                disabled={showLoading}
                                onClick={handleClearFilter}
                                className="text-destructive! hover:text-destructive/90! hover:bg-destructive/10! focus:bg-destructive/10!"
                            >
                                <RotateCcw className="mr-1 size-3.5" />
                                ক্লিয়ার
                            </Button>
                        )}
                    </div>

                    {/* Date Range Picker */}
                    <div className="w-full sm:w-auto">
                        <DatePickerWithRange
                            value={dateRange}
                            disabled={showLoading}
                            onChange={(range) => {
                                if (range?.from && range?.to) {
                                    handleDateRangeChange({ from: range.from, to: range.to }, "")
                                }
                            }}
                            placeholder="তারিখ নির্বাচন করুন"
                            className="w-full sm:w-auto"
                            numberOfMonths={2}
                        />
                    </div>
                </div>

                {/* ------------------------- Stats Grid ------------------------- */}
                {showLoading ? (
                    <MosqueStatsSkeleton />
                ) : isError || !data ? (
                    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted p-10 text-center text-sm text-muted-foreground">
                        <p>ডেটা লোড করা যায়নি। আবার চেষ্টা করুন।</p>
                        <Button size="sm" variant="outline" onClick={() => refetch()}>
                            পুনরায় চেষ্টা করুন
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 overflow-hidden rounded-xl bg-muted shadow-sm lg:grid-cols-4">
                        {stats.map(({ icon: Icon, label, stat, money, filled }, i) => (
                            <div
                                key={label}
                                className={`flex items-center justify-center gap-3 px-4 py-6 sm:gap-4 sm:px-6 sm:py-8 ${i % 2 === 1 ? "border-l border-border" : ""
                                    } ${i >= 2 ? "border-t border-border" : ""} ${i > 0 ? "lg:border-l lg:border-border" : ""
                                    } lg:border-t-0`}
                            >
                                <Icon
                                    className="size-8 shrink-0 text-primary sm:size-9"
                                    strokeWidth={2}
                                    fill={filled ? "currentColor" : "none"}
                                />

                                <div className="text-left">
                                    <p className="text-xl font-extrabold tracking-tight text-primary sm:text-2xl md:text-3xl">
                                        {money ? `৳${bn(stat?.total)}` : bn(stat?.total)}
                                    </p>

                                    <div className="mt-0.5 flex items-center gap-2">
                                        <p className="text-sm font-semibold text-muted-foreground sm:text-base">
                                            {label}
                                        </p>

                                        <span
                                            className={`inline-flex items-center gap-1 text-xs font-semibold ${stat?.trend === "increase" ? "text-success" : "text-destructive"
                                                }`}
                                        >
                                            {stat?.trend === "increase" ? (
                                                <TrendingUp className="size-3.5" />
                                            ) : (
                                                <TrendingDown className="size-3.5" />
                                            )}
                                            {bn(stat?.growth)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}