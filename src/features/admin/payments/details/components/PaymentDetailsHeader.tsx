"use client"

import { ROUTES } from "@/config/routes"
import Link from "next/link"

import { ArrowLeft, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatMonth } from "@/utils/format-month"

interface PaymentDetailsHeaderProps {
  id: string
  familyNo: string
  month: number
  year: number
}

export function PaymentDetailsHeader({
  id,
  familyNo,
  month,
  year,
}: PaymentDetailsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-2">
        <Button variant="ghost" size="sm" asChild className="w-fit">
          <Link href={ROUTES.ADMIN.PAYMENTS.INDEX}>
            <ArrowLeft className="mr-2 size-4" />
            Back to Payments
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payment Details</h1>

          <p className="text-sm text-muted-foreground">
            {familyNo} • {formatMonth(month)} {year}
          </p>
        </div>
      </div>

      <Button asChild>
        <Link href={ROUTES.ADMIN.PAYMENTS.EDIT(id)}>
          <Pencil className="mr-2 size-4" />
          Edit Payment
        </Link>
      </Button>
    </div>
  )
}
