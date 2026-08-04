// src/features/payments/edit/components/PaymentEditForm.tsx

"use client"

import { format } from "date-fns"

import {
  CalendarDays,
  CreditCard,
  Home,
  Loader2,
  Receipt,
  User,
  Wallet,
} from "lucide-react"

import { Controller, type UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { PAYMENT_METHOD_OPTIONS } from "@/constants/payment-methods"

import { formatCurrency } from "@/utils/format-currency"
import { formatMonth } from "@/utils/format-month"

import type { Payment } from "@/types/payment"
import { PaymentMethod } from "@/types/payment"

import type { PaymentFormValues } from "@/schemas/payment.schema"

interface PaymentEditFormProps {
  form: UseFormReturn<PaymentFormValues>
  payment: Payment
  isSubmitting: boolean
  onSubmit: (values: PaymentFormValues) => Promise<void>
  onCancel?: () => void
}

export function PaymentEditForm({
  form,
  payment,
  isSubmitting,
  onSubmit,
  onCancel,
}: PaymentEditFormProps) {
  const {
    register,
    formState: { errors, isDirty },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Payment</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            {/* Family Number */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Home className="size-4" />
                Family Number
              </Label>

              <Input value={payment.familyNo} readOnly disabled />
            </div>

            {/* Head Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="size-4" />
                Head Name
              </Label>

              <Input value={payment.headName} readOnly disabled />
            </div>

            {/* Month */}
            <div className="space-y-2">
              <Label>Month</Label>

              <Input value={formatMonth(payment.month)} readOnly disabled />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label>Year</Label>

              <Input value={payment.year} readOnly disabled />
            </div>

            {/* Charge Amount */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Receipt className="size-4" />
                Charge Amount
              </Label>

              <Input
                value={formatCurrency(payment.chargeAmount)}
                readOnly
                disabled
              />
            </div>

            {/* Total Paid */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Wallet className="size-4" />
                Total Paid
              </Label>

              <Input
                value={formatCurrency(payment.paidAmount)}
                readOnly
                disabled
              />
            </div>

            {/* Payment Amount */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CreditCard className="size-4" />
                Payment Amount
              </Label>

              <Input
                type="number"
                min={1}
                {...register("amount", {
                  valueAsNumber: true,
                })}
              />

              {errors.amount && (
                <p className="text-xs text-destructive">
                  {errors.amount.message}
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Wallet className="size-4" />
                Payment Method
              </Label>

              <Controller
                control={form.control}
                name="method"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>

                    <SelectContent>
                      {PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.method && (
                <p className="text-xs text-destructive">
                  {errors.method.message}
                </p>
              )}
            </div>

            {/* Reference */}
            <div className="space-y-2 md:col-span-2">
              <Label>Transaction Reference</Label>

              <Input
                placeholder="Transaction reference"
                {...register("reference")}
              />

              {errors.reference && (
                <p className="text-xs text-destructive">
                  {errors.reference.message}
                </p>
              )}
            </div>

            {/* Note */}
            <div className="space-y-2 md:col-span-2">
              <Label>Note</Label>

              <Textarea
                rows={4}
                placeholder="Write a note..."
                {...register("note")}
              />

              {errors.note && (
                <p className="text-xs text-destructive">
                  {errors.note.message}
                </p>
              )}
            </div>

            {/* Paid At */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                Paid At
              </Label>

              <Input
                type="datetime-local"
                value={
                  form.watch("paidAt")
                    ? format(
                        new Date(form.watch("paidAt")),
                        "yyyy-MM-dd'T'HH:mm"
                      )
                    : ""
                }
                onChange={(e) =>
                  form.setValue(
                    "paidAt",
                    e.target.value
                      ? new Date(e.target.value).toISOString()
                      : "",
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    }
                  )
                }
              />

              {errors.paidAt && (
                <p className="text-xs text-destructive">
                  {errors.paidAt.message}
                </p>
              )}
            </div>

            {/* Created By */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Created By</Label>

              <div className="rounded-md border bg-muted/20 px-3 py-2 text-sm">
                {payment.createdBy?.name ?? "-"}
              </div>
            </div>

            {/* Updated By */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Updated By</Label>

              <div className="rounded-md border bg-muted/20 px-3 py-2 text-sm">
                {payment.updatedBy?.name ?? "-"}
              </div>
            </div>

            {/* Created At */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Created At</Label>

              <div className="rounded-md border bg-muted/20 px-3 py-2 text-sm">
                {format(new Date(payment.createdAt), "dd MMM yyyy, hh:mm a")}
              </div>
            </div>

            {/* Updated At */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Last Updated</Label>

              <div className="rounded-md border bg-muted/20 px-3 py-2 text-sm">
                {format(new Date(payment.updatedAt), "dd MMM yyyy, hh:mm a")}
              </div>
            </div>
          </div>

          {isDirty && (
            <div className="flex justify-end gap-3 border-t pt-6">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
