// src/features/donations/edit/components/ReceiptPreviewCard.tsx

"use client"

import { format } from "date-fns"
import { CalendarDays, CreditCard, Receipt, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { formatCurrency } from "@/utils/format-currency"
import { formatPaymentMethod } from "@/utils/format-payment-method"

import type { DonationFormValues } from "@/schemas/donation.schema"
import type { Donor } from "@/types/donor"

interface ReceiptPreviewCardProps {
  values: DonationFormValues
  donor?: Donor | null
  receiptNo: string
}

export function ReceiptPreviewCard({
  values,
  donor,
  receiptNo,
}: ReceiptPreviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="size-5" />
          Receipt Preview
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Header */}
        <div className="rounded-lg border bg-muted/30 p-5 text-center">
          <h2 className="text-lg font-bold">Baitul Aman Jame Mosque</h2>

          <p className="mt-1 text-sm text-muted-foreground">Donation Receipt</p>

          <Badge className="mt-3">{receiptNo}</Badge>
        </div>

        {/* Amount */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Donation Amount</p>

          <h1 className="mt-1 text-4xl font-bold">
            {formatCurrency(values.amount ?? 0)}
          </h1>
        </div>

        {/* Details */}
        <div className="space-y-3 rounded-lg border p-4">
          <Item
            icon={<User className="size-4" />}
            label="Donor"
            value={values.isAnonymous ? "Anonymous" : (donor?.name ?? "-")}
          />

          <Item
            icon={<CreditCard className="size-4" />}
            label="Payment"
            value={formatPaymentMethod(values.paymentMethod)}
          />

          <Item
            icon={<Receipt className="size-4" />}
            label="Purpose"
            value={values.purpose || "-"}
          />

          <Item
            icon={<CalendarDays className="size-4" />}
            label="Donation Date"
            value={format(new Date(values.donatedAt), "dd MMM yyyy, hh:mm a")}
          />
        </div>

        {values.note && (
          <div className="rounded-lg border bg-muted/20 p-4">
            <p className="mb-2 text-sm font-medium">Note</p>

            <p className="text-sm text-muted-foreground">{values.note}</p>
          </div>
        )}

        <div className="rounded-lg bg-primary/5 p-4 text-center">
          <p className="font-medium">May Allah accept your donation.</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Jazakallahu Khairan for supporting the mosque.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

interface ItemProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

function Item({ icon, label, value }: ItemProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        {label}
      </div>

      <span className="text-right text-sm font-medium">{value}</span>
    </div>
  )
}
