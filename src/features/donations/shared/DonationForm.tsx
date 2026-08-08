"use client"

// src/features/donations/shared/DonationForm.tsx
import { useEffect, useMemo } from "react"
import { format } from "date-fns"
import {
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  Loader2,
  Receipt,
} from "lucide-react"

import { useWatch, type UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  EntityPickerDialog,
  EntityPickerTrigger,
  useEntityPicker,
  type EntityPickerOption,
} from "@/components/common/entity-picker"

import { PAYMENT_METHOD_OPTIONS } from "@/constants/payment-methods"

import type { Donor } from "@/types/donor"
import type { DonationFormValues } from "@/schemas/donation.schema"
import { PaymentMethod } from "@/types/payment"

interface DonationFormDonor {
  id: string
  name: string
  phone: string
  address?: string | null
  avatar?: {
    url: string
  } | null
}

interface DonationFormProps {
  form: UseFormReturn<DonationFormValues>

  donors: Donor[]

  selectedDonor?: DonationFormDonor | null

  loadingDonors?: boolean

  isSubmitting?: boolean

  title?: string

  submitText?: string

  showMetadata?: boolean

  createdAt?: string

  updatedAt?: string

  onCancel?: () => void

  onSearchDonor: (search: string) => void

  onSubmit: (values: DonationFormValues) => Promise<void>
}

export function DonationForm({
  form,
  donors,
  selectedDonor,
  loadingDonors = false,
  isSubmitting = false,

  title = "Donation",

  submitText = "Save",

  showMetadata = false,

  createdAt,
  updatedAt,

  onCancel,

  onSearchDonor,

  onSubmit,
}: DonationFormProps) {
  const picker = useEntityPicker()

  const {
    register,
    formState: { errors, isDirty },
  } = form

  const paymentMethod = useWatch({
    control: form.control,
    name: "paymentMethod",
  })

  const donorId = useWatch({
    control: form.control,
    name: "donorId",
  })

  const currentDonor = useMemo(() => {
    return donors.find((donor) => donor.id === donorId) ?? selectedDonor ?? null
  }, [donors, donorId, selectedDonor])

  const donorItems: EntityPickerOption[] = useMemo(
    () =>
      donors.map((donor) => ({
        id: donor.id,
        title: donor.name,
        subtitle: donor.phone,
        description: donor.address ?? undefined,
        avatar: donor.avatar?.url ?? null,
      })),
    [donors]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            {/* Donor */}
            <div className="space-y-2 md:col-span-2">
              <EntityPickerTrigger
                label="Donor"
                value={currentDonor?.name}
                subtitle={currentDonor?.phone}
                avatar={currentDonor?.avatar?.url}
                placeholder="Select donor"
                onClick={picker.openPicker}
              />
              {errors.donorId && (
                <p className="text-xs text-destructive">
                  {errors.donorId.message}
                </p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CircleDollarSign className="size-4" />
                Amount
              </Label>

              <Input
                type="number"
                min={1}
                placeholder="Enter donation amount"
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

              <Select
                value={paymentMethod}
                onValueChange={(value) => {
                  if (!value) return

                  form.setValue("paymentMethod", value as PaymentMethod, {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }}
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
              {errors.paymentMethod && (
                <p className="text-xs text-destructive">
                  {errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Purpose */}
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <Receipt className="size-4" />
                Purpose
              </Label>

              <Textarea
                rows={3}
                placeholder="Donation purpose"
                {...register("purpose")}
              />
              {errors.purpose && (
                <p className="text-xs text-destructive">
                  {errors.purpose.message}
                </p>
              )}
            </div>

            {/* Anonymous */}
            <div className="space-y-2">
              <Label>Anonymous Donation</Label>

              <div className="flex h-10 items-center justify-between rounded-md border px-3">
                <span className="text-sm">Hide donor information</span>

                <Switch
                  checked={form.watch("isAnonymous")}
                  onCheckedChange={(checked) =>
                    form.setValue("isAnonymous", checked, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
              </div>
              {errors.isAnonymous && (
                <p className="text-xs text-destructive">
                  {errors.isAnonymous.message}
                </p>
              )}
            </div>

            {/* Transaction Reference */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Receipt className="size-4" />
                Transaction Reference
              </Label>

              <Input
                placeholder="Transaction reference"
                {...register("transactionReference")}
              />
              {errors.transactionReference && (
                <p className="text-xs text-destructive">
                  {errors.transactionReference.message}
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

            {/* Donation Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                Donation Date
              </Label>

              <Input
                type="datetime-local"
                value={
                  form.watch("donatedAt")
                    ? format(
                        new Date(form.watch("donatedAt")),
                        "yyyy-MM-dd'T'HH:mm"
                      )
                    : ""
                }
                onChange={(e) =>
                  form.setValue(
                    "donatedAt",
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
              {errors.donatedAt && (
                <p className="text-xs text-destructive">
                  {errors.donatedAt.message}
                </p>
              )}
            </div>

            {/* Metadata */}
            {showMetadata && (
              <>
                <div className="space-y-2">
                  <Label className="text-muted-foreground">Created At</Label>

                  <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                    {createdAt
                      ? format(new Date(createdAt), "dd MMM yyyy, hh:mm a")
                      : "-"}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground">Last Updated</Label>

                  <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                    {updatedAt
                      ? format(new Date(updatedAt), "dd MMM yyyy, hh:mm a")
                      : "-"}
                  </div>
                </div>
              </>
            )}
          </div>

          <EntityPickerDialog
            open={picker.open}
            onOpenChange={picker.onOpenChange}
            title="Select Donor"
            placeholder="Search donor..."
            search={picker.search}
            onSearchChange={(value) => {
              picker.setSearch(value)
              onSearchDonor(value)
            }}
            items={donorItems}
            loading={loadingDonors}
            selectedId={form.watch("donorId")}
            onSelect={(item) => {
              form.setValue("donorId", item.id, {
                shouldDirty: true,
                shouldValidate: true,
              })

              picker.closePicker()
            }}
          />

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
