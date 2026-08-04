"use client"

import { Banknote, CircleDollarSign, CreditCard, Wallet } from "lucide-react"

import {
    StatsCard,
    StatsCardsSkeletonMap,
} from "@/components/common/stats-card"
import { formatCurrency } from "@/utils/format-currency"
import { PaymentSummary } from "@/types/payment"

interface PaymentSummaryCardsProps {
    data: PaymentSummary
    isLoading: boolean
}
export function PaymentSummaryCards({
    data,
    isLoading,
}: PaymentSummaryCardsProps) {
    if (isLoading) {
        return <StatsCardsSkeletonMap count={4} />
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatsCard
                title="Total Charges"
                value={formatCurrency(data?.totalChargeAmount ?? 0)}
                subtitle={`${data?.totalCharges ?? 0} monthly charges`}
                icon={<Wallet className="size-5" />}
                iconBg="bg-orange-500/10"
                iconColor="text-orange-600"
            />

            <StatsCard
                title="Collected"
                value={formatCurrency(data?.totalPaidAmount ?? 0)}
                subtitle={`${data?.totalPayments ?? 0} payments`}
                icon={<CircleDollarSign className="size-5" />}
                iconBg="bg-green-500/10"
                iconColor="text-green-600"
            />

            <StatsCard
                title="Outstanding"
                value={formatCurrency(data?.totalDueAmount ?? 0)}
                subtitle={`${data?.dueCharges ?? 0} unpaid charges`}
                icon={<Banknote className="size-5" />}
                iconBg="bg-red-500/10"
                iconColor="text-red-600"
            />

            <StatsCard
                title="Average Payment"
                value={formatCurrency(data?.averagePayment ?? 0)}
                subtitle={`${data?.paidCharges ?? 0} completed charges`}
                icon={<CreditCard className="size-5" />}
                iconBg="bg-blue-500/10"
                iconColor="text-blue-600"
            />
        </div>
    )
}
