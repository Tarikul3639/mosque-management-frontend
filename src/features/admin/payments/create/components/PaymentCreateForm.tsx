"use client"

// src/features/payments/create/components/PaymentCreateForm.tsx
import { format } from "date-fns"
import {
  CalendarDays,
  CreditCard,
  FileText,
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
import {
  EntityPicker,
  type EntityPickerOption,
} from "@/components/common/entity-picker"

import { PAYMENT_METHOD_OPTIONS } from "@/constants/payment-methods"
import { PaymentMethod } from "@/types/payment"
import type { MonthlyCharge } from "@/types/monthly-charge"
import type { PaymentFormValues } from "@/schemas/payment.schema"

interface PaymentCreateFormProps {
  form: UseFormReturn<PaymentFormValues>
  families: EntityPickerOption[]
  monthlyCharges: MonthlyCharge[]
  loadingFamilies: boolean
  loadingCharges: boolean
  isSubmitting: boolean
  onSearchFamily: (value: string) => void
  onSearchCharge: (value: string) => void
  onSubmit: (values: PaymentFormValues) => Promise<void>
}

export function PaymentCreateForm({
  form,
  families,
  monthlyCharges,
  loadingFamilies,
  loadingCharges,
  isSubmitting,
  onSearchFamily,
  onSearchCharge,
  onSubmit,
}: PaymentCreateFormProps) {
  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = form

  const selectedCharge = monthlyCharges.find(
    (item) => item.id === watch("monthlyChargeId")
  )

  const dueAmount = selectedCharge
    ? selectedCharge.amount - selectedCharge.paidAmount
    : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Payment</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            {/* Family */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Home className="size-4" />
                Family
              </Label>

              <Controller
                control={control}
                name="familyId"
                render={({ field }) => (
                  <EntityPicker
                    title="Select Family"
                    value={field.value}
                    items={families}
                    loading={loadingFamilies}
                    placeholder="Select family"
                    searchPlaceholder="Search family..."
                    emptyTitle="No family found"
                    emptyDescription="Try another keyword."
                    onSearch={onSearchFamily}
                    onChange={(value) => {
                      field.onChange(value)
                      setValue("monthlyChargeId", "", {
                        shouldValidate: true,
                      })
                      setValue("amount", 0)
                    }}
                  />
                )}
              />

              {errors.familyId && (
                <p className="text-xs text-destructive">
                  {errors.familyId.message}
                </p>
              )}
            </div>

            {/* Monthly Charge */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Receipt className="size-4" />
                Monthly Charge
              </Label>

              <Controller
                control={control}
                name="monthlyChargeId"
                render={({ field }) => (
                  <EntityPicker
                    title="Select Monthly Charge"
                    value={field.value}
                    loading={loadingCharges}
                    placeholder="Select monthly charge"
                    searchPlaceholder="Search month..."
                    emptyTitle="No monthly charge found"
                    emptyDescription="This family has no outstanding monthly charges."
                    onSearch={onSearchCharge}
                    items={monthlyCharges.map((charge) => ({
                      id: charge.id,
                      title: `${charge.year} • ${charge.month}`,
                      subtitle: `Due ৳${(
                        charge.amount - charge.paidAmount
                      ).toLocaleString()}`,
                      description: charge.status,
                      badge: charge.status,
                    }))}
                    onChange={(value) => {
                      field.onChange(value)
                      const charge = monthlyCharges.find(
                        (item) => item.id === value
                      )
                      if (charge) {
                        setValue("amount", charge.amount - charge.paidAmount, {
                          shouldDirty: true,
                          shouldValidate: true,
                        })
                      }
                    }}
                  />
                )}
              />

              {errors.monthlyChargeId && (
                <p className="text-xs text-destructive">
                  {errors.monthlyChargeId.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Wallet className="size-4" />
                Payment Amount
              </Label>

              <Input
                type="number"
                min={0}
                step="0.01"
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
                <CreditCard className="size-4" />
                Payment Method
              </Label>

              <Controller
                control={control}
                name="method"
                render={({ field }) => (
                  <Select
                    key={field.value}
                    value={field.value ?? ""}
                    onValueChange={(value) =>
                      field.onChange(value as PaymentMethod)
                    }
                  >
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

            {/* Paid At */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                Payment Date
              </Label>

              <Input
                type="datetime-local"
                value={
                  watch("paidAt")
                    ? format(new Date(watch("paidAt")), "yyyy-MM-dd'T'HH:mm")
                    : ""
                }
                onChange={(e) =>
                  setValue(
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

            {/* Reference */}
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <FileText className="size-4" />
                Reference
              </Label>

              <Input
                placeholder="Optional transaction reference"
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
              <Label className="flex items-center gap-2">
                <User className="size-4" />
                Note
              </Label>

              <Textarea
                rows={4}
                placeholder="Write payment note..."
                {...register("note")}
              />

              {errors.note && (
                <p className="text-xs text-destructive">
                  {errors.note.message}
                </p>
              )}
            </div>

            {/* Summary */}
            {selectedCharge && (
              <div className="md:col-span-2">
                <div className="rounded-lg border bg-muted/30 p-5">
                  <h3 className="mb-4 text-sm font-semibold">
                    Monthly Charge Summary
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Charge Amount
                      </p>
                      <p className="mt-1 text-lg font-semibold">
                        ৳{selectedCharge.amount.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Already Paid
                      </p>
                      <p className="mt-1 text-lg font-semibold text-emerald-600">
                        ৳{selectedCharge.paidAmount.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Remaining Due
                      </p>
                      <p className="mt-1 text-lg font-bold text-rose-600">
                        ৳{dueAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end border-t pt-6">
            {/* Reset Button */}
            {isDirty && (
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="mr-3 min-w-44"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
            )}

            {/* Create Payment Button */}
            <Button type="submit" disabled={isSubmitting} className="min-w-44">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Creating Payment...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 size-4" />
                  Create Payment
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
