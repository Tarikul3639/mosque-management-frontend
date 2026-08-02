// src/features/expenses/list/components/ExpenseSummaryCards.tsx

"use client";

import {
    ReceiptText,
    Wallet,
    CalendarDays,
    TrendingDown,
} from "lucide-react";

import { StatsCard, StatsCardsSkeletonMap } from "@/components/common/stats-card";
import { formatCurrency } from "@/utils/format-currency";
import type { ExpenseSummary } from "@/types/expense";

interface ExpenseSummaryCardsProps {
    summary?: ExpenseSummary;
    isLoading?: boolean;
}

export function ExpenseSummaryCards({
    summary,
    isLoading = false,
}: ExpenseSummaryCardsProps) {

    if (isLoading) {
        return <StatsCardsSkeletonMap count={4} />
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
                title="Total Expenses"
                value={summary?.totalExpenses ?? 0}
                subtitle="Recorded expenses"
                icon={<ReceiptText className="size-5" />}
                iconBg="bg-blue-500/10"
                iconColor="text-blue-600"
            />

            <StatsCard
                title="Total Amount"
                value={formatCurrency(summary?.totalAmount ?? 0)}
                subtitle="Lifetime expenses"
                icon={<Wallet className="size-5" />}
                iconBg="bg-red-500/10"
                iconColor="text-red-600"
            />

            <StatsCard
                title="This Month"
                value={formatCurrency(summary?.currentMonthAmount ?? 0)}
                subtitle="Current month"
                icon={<CalendarDays className="size-5" />}
                iconBg="bg-orange-500/10"
                iconColor="text-orange-600"
            />

            <StatsCard
                title="This Year"
                value={formatCurrency(summary?.currentYearAmount ?? 0)}
                subtitle="Current year"
                icon={<TrendingDown className="size-5" />}
                iconBg="bg-emerald-500/10"
                iconColor="text-emerald-600"
            />
        </div>
    );
}