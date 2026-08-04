// src/features/payments/edit/components/PaymentEditHeader.tsx

"use client"

import Link from "next/link"

import { ArrowLeft, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatMonth } from "@/utils/format-month"

interface PaymentEditHeaderProps {
    paymentId: string
    familyNo: string
    month: number
    year: number
}

export function PaymentEditHeader({
    paymentId,
    familyNo,
    month,
    year,
}: PaymentEditHeaderProps) {
    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
                <Button variant="ghost" size="sm" asChild className="w-fit">
                    <Link href="/payments">
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Payments
                    </Link>
                </Button>

                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Payment</h1>

                    <p className="text-sm text-muted-foreground">
                        {familyNo} • {formatMonth(month)} {year}
                    </p>
                </div>
            </div>

            <Button variant="outline" asChild>
                <Link href={`/payments/${paymentId}`}>
                    <Eye className="mr-2 size-4" />
                    View Details
                </Link>
            </Button>
        </div>
    )
}
