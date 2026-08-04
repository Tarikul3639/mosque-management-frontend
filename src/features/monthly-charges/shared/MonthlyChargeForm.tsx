"use client"

import { format } from "date-fns"
import { CalendarDays, Home, Loader2, Wallet } from "lucide-react"

import { type UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { MonthlyCharge } from "@/types/monthly-charge"
import type { MonthlyChargeFormValues } from "@/schemas/monthly-charge.schema"
import { formatMonth } from "@/utils/format-month"
import { formatCurrency } from "@/utils/format-currency"

interface MonthlyChargeFormProps {
  title: string
  submitText: string

  form: UseFormReturn<MonthlyChargeFormValues>

  monthlyCharge: MonthlyCharge

  isSubmitting: boolean

  showMetadata?: boolean

  createdAt?: string
  updatedAt?: string

  onSubmit: (values: MonthlyChargeFormValues) => Promise<void>

  onCancel?: () => void
}

export function MonthlyChargeForm({
  title,
  submitText,

  form,
  monthlyCharge,

  isSubmitting,

  showMetadata = false,

  createdAt,
  updatedAt,

  onSubmit,
  onCancel,
}: MonthlyChargeFormProps) {
  const {
    register,
    formState: { errors, isDirty },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
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

              <Input value={monthlyCharge.familyNo} readOnly disabled />
            </div>

            {/* Head Name */}
            <div className="space-y-2">
              <Label>Head Name</Label>

              <Input value={monthlyCharge.headName} readOnly disabled />
            </div>

            {/* Month */}
            <div className="space-y-2">
              <Label>Month</Label>

              <Input
                value={formatMonth(monthlyCharge.month)}
                readOnly
                disabled
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label>Year</Label>

              <Input value={monthlyCharge.year} readOnly disabled />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Wallet className="size-4" />
                Amount
              </Label>

              <Input
                type="number"
                min={0}
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

            {/* Paid Amount */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Wallet className="size-4" />
                Paid Amount
              </Label>

              <Input
                value={formatCurrency(monthlyCharge.paidAmount)}
                readOnly
                disabled
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status</Label>

              <Input value={monthlyCharge.status} readOnly disabled />
            </div>

            {/* Due Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                Due Date
              </Label>

              <Input
                type="datetime-local"
                value={
                  form.watch("dueDate")
                    ? format(
                        new Date(form.watch("dueDate")),
                        "yyyy-MM-dd'T'HH:mm"
                      )
                    : ""
                }
                onChange={(e) =>
                  form.setValue(
                    "dueDate",
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
              {errors.dueDate && (
                <p className="text-xs text-destructive">
                  {errors.dueDate.message}
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
                value={
                  monthlyCharge.paidAt
                    ? format(
                        new Date(monthlyCharge.paidAt),
                        "dd MMM yyyy, hh:mm a"
                      )
                    : "-"
                }
                readOnly
                disabled
              />
            </div>

            {showMetadata && (
              <>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Created At</Label>

                  <div className="rounded-md border bg-muted/20 px-3 py-2 text-sm">
                    {createdAt
                      ? format(new Date(createdAt), "dd MMM yyyy, hh:mm a")
                      : "-"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Last Updated</Label>

                  <div className="rounded-md border bg-muted/20 px-3 py-2 text-sm">
                    {updatedAt
                      ? format(new Date(updatedAt), "dd MMM yyyy, hh:mm a")
                      : "-"}
                  </div>
                </div>
              </>
            )}
          </div>

          {(isDirty || !showMetadata) && (
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

                {submitText}
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
