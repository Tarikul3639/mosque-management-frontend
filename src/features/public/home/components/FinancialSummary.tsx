"use client"

import type { DashboardSummaryResponse } from "@/services/api/dashboard-summary.service"

/* ------------------------------ Constants ------------------------------ */
const GOAL = 2000000

/* ------------------------------- Helpers ------------------------------- */
const bn = (n: number) => Math.round(n).toLocaleString("bn-BD")

const safePercent = (part: number, whole: number) =>
    whole > 0 ? Math.min(100, Math.round((part / whole) * 100)) : 0

/* --------------------------- Circular Progress --------------------------- */
function ProgressRing({ percent }: { percent: number }) {
    const r = 56
    const c = 2 * Math.PI * r
    const filled = (percent / 100) * c

    return (
        <div className="relative size-36 sm:size-40">
            <svg viewBox="0 0 140 140" className="size-full -rotate-90">
                <circle
                    cx="70"
                    cy="70"
                    r={r}
                    fill="none"
                    strokeWidth="12"
                    className="stroke-border"
                />
                <circle
                    cx="70"
                    cy="70"
                    r={r}
                    fill="none"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${filled} ${c - filled}`}
                    className="stroke-primary transition-all duration-700"
                />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-extrabold text-primary sm:text-3xl">
                    {bn(percent)}%
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    লক্ষ্য অর্জিত
                </p>
            </div>
        </div>
    )
}

/* ------------------------------ Linear Bar ------------------------------ */
function ProgressBar({ percent, color }: { percent: number; color: "green" | "red" }) {
    return (
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-border">
            <div
                className={`h-full rounded-full transition-all duration-700 ${color === "green" ? "bg-primary" : "bg-destructive"
                    }`}
                style={{ width: `${percent}%` }}
            />
        </div>
    )
}

/* -------------------------------- Component ------------------------------- */
interface FinancialSummaryProps {
    data: DashboardSummaryResponse | null
}

export function FinancialSummary({ data }: FinancialSummaryProps) {
    const achievedPct = safePercent(data?.totalDonation || 0, GOAL)
    const expensePct = safePercent(data?.totalExpense || 0, data?.totalDonation || 0)

    return (
        <section className="bg-background px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
                    <h2 className="text-lg font-bold text-foreground sm:text-xl">
                        আর্থিক অবস্থা
                    </h2>

                    <div className="mt-6 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
                        {/* Left: মোট সংগ্রহ */}
                        <div>
                            <p className="text-sm font-medium text-foreground sm:text-base">
                                মোট সংগ্রহ
                            </p>
                            <p className="mt-1 text-2xl font-extrabold text-primary sm:text-3xl">
                                {bn(data?.totalDonation || 0)} টাকা
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                লক্ষ্য: {bn(GOAL)} টাকা
                            </p>

                            <div className="mt-3">
                                <ProgressBar percent={achievedPct} color="green" />
                            </div>

                            <p className="mt-3 text-sm text-muted-foreground">
                                লক্ষ্যর{" "}
                                <span className="font-bold text-primary">{bn(achievedPct)}%</span>{" "}
                                অর্জিত হয়েছে
                            </p>
                        </div>

                        {/* Center: Ring */}
                        <div className="flex justify-center">
                            <ProgressRing percent={achievedPct} />
                        </div>

                        {/* Right: মোট ব্যয় */}
                        <div>
                            <p className="text-sm font-medium text-foreground sm:text-base">
                                মোট ব্যয়
                            </p>
                            <p className="mt-1 text-2xl font-extrabold text-destructive sm:text-3xl">
                                {bn(data?.totalExpense || 0)} টাকা
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                                মোট সংগ্রহের {bn(expensePct)}% ব্যয় হয়েছে
                            </p>

                            <div className="mt-3">
                                <ProgressBar percent={expensePct} color="red" />
                            </div>

                            <p className="mt-3 text-sm text-muted-foreground">
                                অবশিষ্ট:{" "}
                                <span className="font-bold text-foreground">
                                    {bn(data?.balance || 0)} টাকা
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Monthly stats */}
                    <div className="mt-8 grid gap-3 border-t border-border pt-5 sm:grid-cols-3">
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            এই মাসের সংগ্রহ:{" "}
                            <span className="font-bold text-primary">
                                {bn(data?.monthlyDonation || 0)} টাকা
                            </span>
                        </p>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            এই মাসের ব্যয়:{" "}
                            <span className="font-bold text-destructive">
                                {bn(data?.monthlyExpense || 0)} টাকা
                            </span>
                        </p>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            এই মাসের ব্যালেন্স:{" "}
                            <span className="font-bold text-foreground">
                                {bn(data?.monthlyBalance || 0)} টাকা
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}