// src/features/payments/details/components/PaymentInformationCard.tsx

"use client"

import {
  CalendarDays,
  CreditCard,
  Home,
  Receipt,
  User,
  Wallet,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"

import { formatCurrency } from "@/utils/format-currency"
import { formatMonth } from "@/utils/format-month"
import { formatDate } from "@/utils/format-date"

import type { Payment, PaymentMethod, PaymentStatus } from "@/types/payment"

import { Badge } from "@/components/ui/badge"

interface PaymentInformationCardProps {
  payment: Payment
}

export function PaymentInformationCard({
  payment,
}: PaymentInformationCardProps) {
  const remainingAmount = Math.max(0, payment.chargeAmount - payment.paidAmount)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div className="space-y-1">
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Complete payment and billing details.
          </CardDescription>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <LargeStatusBadge status={payment.status} />
          <span className="text-xs font-semibold text-muted-foreground">
            {formatCurrency(payment.paymentAmount)}
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="space-y-6 pt-6">
        {/* ========================= */}
        {/* Basic Information */}
        {/* ========================= */}

        <div className="space-y-5">
          <h3 className="text-base font-semibold">Basic Information</h3>

          <InfoRow
            icon={<Home className="size-4" />}
            label="Family"
            value={payment.familyNo}
            subtitle={payment.headName}
          />

          <InfoRow
            icon={<CalendarDays className="size-4" />}
            label="Billing Period"
            value={`${formatMonth(payment.month)} ${payment.year}`}
          />

          <InfoRow
            icon={<Receipt className="size-4" />}
            label="Status"
            value={<StatusBadge status={payment.status} />}
          />
        </div>

        <Separator />

        {/* ========================= */}
        {/* Financial Summary */}
        {/* ========================= */}

        <div className="space-y-5">
          <h3 className="text-base font-semibold">Financial Summary</h3>

          <InfoRow
            icon={<Wallet className="size-4" />}
            label="Charge Amount"
            value={formatCurrency(payment.chargeAmount)}
          />

          <InfoRow
            icon={<CreditCard className="size-4" />}
            label="Payment Amount"
            value={formatCurrency(payment.paymentAmount)}
          />

          <InfoRow
            icon={<Receipt className="size-4" />}
            label="Total Paid"
            value={formatCurrency(payment.paidAmount)}
          />

          <InfoRow
            icon={<Wallet className="size-4" />}
            label="Remaining Due"
            value={
              <span
                className={
                  remainingAmount > 0
                    ? "font-semibold text-rose-600"
                    : "font-semibold text-emerald-600"
                }
              >
                {formatCurrency(remainingAmount)}
              </span>
            }
          />
        </div>

        <Separator />

        {/* ========================= */}
        {/* Transaction Information */}
        {/* ========================= */}

        <div className="space-y-5">
          <h3 className="text-base font-semibold">Transaction Information</h3>

          <InfoRow
            icon={<CreditCard className="size-4" />}
            label="Payment Method"
            value={<MethodBadge method={payment.method} />}
          />

          <InfoRow
            icon={<CalendarDays className="size-4" />}
            label="Paid At"
            value={formatDate(payment.paidAt)}
          />

          {payment.reference && (
            <InfoRow
              icon={<Receipt className="size-4" />}
              label="Reference"
              value={payment.reference}
            />
          )}
        </div>

        <Separator />

        {/* ========================= */}
        {/* Audit Information */}
        {/* ========================= */}

        <div className="space-y-5">
          <h3 className="text-base font-semibold">Audit Information</h3>

          <InfoRow
            icon={<User className="size-4" />}
            label="Created By"
            value={payment.createdBy?.name ?? "-"}
          />

          <InfoRow
            icon={<User className="size-4" />}
            label="Updated By"
            value={payment.updatedBy?.name ?? "-"}
          />

          <InfoRow
            icon={<CalendarDays className="size-4" />}
            label="Created At"
            value={formatDate(payment.createdAt)}
          />

          <InfoRow
            icon={<CalendarDays className="size-4" />}
            label="Last Updated"
            value={formatDate(payment.updatedAt)}
          />
        </div>

        {payment.note && (
          <>
            <Separator />

            <div className="space-y-4">
              <h3 className="text-base font-semibold">Payment Note</h3>

              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-sm leading-7 whitespace-pre-wrap text-muted-foreground">
                  {payment.note}
                </p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

interface InfoRowProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  subtitle?: React.ReactNode
}

function InfoRow({ icon, label, value, subtitle }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {icon}
        </div>

        <span className="text-sm text-muted-foreground">{label}</span>
      </div>

      <div className="text-right">
        <div className="text-sm font-medium">{value}</div>
        {subtitle && (
          <div className="mt-0.5 text-xs text-muted-foreground">{subtitle}</div>
        )}
      </div>
    </div>
  )
}

function LargeStatusBadge({ status }: { status: PaymentStatus }) {
  const styles: Record<PaymentStatus, string> = {
    PAID: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    PARTIAL: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    DUE: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  }

  const labels: Record<PaymentStatus, string> = {
    PAID: "PAID",
    PARTIAL: "PARTIAL",
    DUE: "DUE",
  }

  return (
    <div
      className={`rounded-full border px-4 py-1.5 text-base font-bold tracking-wider ${styles[status]}`}
    >
      {labels[status]}
    </div>
  )
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const variants: Record<PaymentStatus, string> = {
    PAID: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",

    PARTIAL: "bg-amber-500/10 text-amber-600 border-amber-500/20",

    DUE: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  }

  const labels: Record<PaymentStatus, string> = {
    PAID: "Paid",
    PARTIAL: "Partial",
    DUE: "Due",
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {labels[status]}
    </Badge>
  )
}

function MethodBadge({ method }: { method: PaymentMethod }) {
  return (
    <Badge variant="secondary">
      {method
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase())}
    </Badge>
  )
}
