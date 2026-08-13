import { CreditCard, Wallet, AlertCircle } from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import type {
    CurrentFee,
    PaymentSummary,
} from "@/services/api/families.service"

interface FamilyPaymentSummaryProps {
    currentFee: CurrentFee | null
    summary: PaymentSummary
}

export function FamilyPaymentSummary({
    currentFee,
    summary,
}: FamilyPaymentSummaryProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>পেমেন্ট সারাংশ</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <SummaryItem
                    icon={<CreditCard className="size-4" />}
                    label="বর্তমান মাসিক চাঁদা"
                    value={`৳ ${currentFee?.monthlyFee ?? 0}`}
                />

                <SummaryItem
                    icon={<Wallet className="size-4" />}
                    label="মোট পরিশোধ"
                    value={`৳ ${summary.totalPaid}`}
                />

                <SummaryItem
                    icon={<AlertCircle className="size-4" />}
                    label="মোট বকেয়া"
                    value={`৳ ${summary.totalDue}`}
                    danger={summary.totalDue > 0}
                />
            </CardContent>
        </Card>
    )
}

interface SummaryItemProps {
    icon: React.ReactNode
    label: string
    value: string
    danger?: boolean
}

function SummaryItem({
    icon,
    label,
    value,
    danger = false,
}: SummaryItemProps) {
    return (
        <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
                <div className="text-muted-foreground">
                    {icon}
                </div>

                <span className="text-sm">
                    {label}
                </span>
            </div>

            <span
                className={
                    danger
                        ? "font-semibold text-destructive"
                        : "font-semibold"
                }
            >
                {value}
            </span>
        </div>
    )
}