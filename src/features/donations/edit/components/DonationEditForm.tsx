// src/features/donations/edit/components/DonationEditForm.tsx

"use client"

import { useMemo } from "react"
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

import { Switch } from "@/components/ui/switch"
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
  EntityPickerDialog,
  EntityPickerTrigger,
  useEntityPicker,
  type EntityPickerOption,
} from "@/components/common/entity-picker"

import { PAYMENT_METHOD_OPTIONS } from "@/constants/payment-methods"

import type { Donation } from "@/types/donation"
import type { Donor } from "@/types/donor"

import type { DonationFormValues } from "@/schemas/donation.schema"

interface DonationEditFormProps {
  donation: Donation

  donors: Donor[]

  loadingDonors?: boolean

  form: UseFormReturn<DonationFormValues>

  isSubmitting: boolean

  onSearchDonor: (search: string) => void

  onSubmit: (values: DonationFormValues) => Promise<void>
}

export function DonationEditForm({
  donation,
  donors,
  loadingDonors = false,
  form,
  isSubmitting,
  onSearchDonor,
  onSubmit,
}: DonationEditFormProps) {
  const picker = useEntityPicker()

  const {
    formState: { isDirty },
  } = form

  const donorId = useWatch({
    control: form.control,
    name: "donorId",
  })

  const selectedDonor = useMemo(() => {
    return (
      donors.find((x) => x.id === donorId) ?? {
        id: donation.donor.id,
        name: donation.donor.name,
        phone: donation.donor.phone,
        address: donation.donor.address ?? undefined,
        avatar: null,
      }
    )
  }, [donors, donorId, donation])

  const donorItems: EntityPickerOption[] = useMemo(
    () =>
      donors.map((donor) => ({
        id: donor.id,
        title: donor.name ?? "",
        subtitle: donor.phone,
        description: donor.address ?? undefined,
        avatar: donor.avatar?.url ?? null,
      })),
    [donors]
  )

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Edit Donation</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-5 md:grid-cols-2">
              {/* Donor */}
              <div className="md:col-span-2">
                <EntityPickerTrigger
                  label="Donor"
                  value={selectedDonor?.name}
                  subtitle={selectedDonor?.phone}
                  avatar={selectedDonor?.avatar?.url}
                  placeholder="Select donor"
                  onClick={picker.openPicker}
                />
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
                  {...form.register("amount", {
                    valueAsNumber: true,
                  })}
                />
              </div>
              {/* Payment */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CreditCard className="size-4" />
                  Payment Method
                </Label>

                <Select
                  value={form.watch("paymentMethod")}
                  onValueChange={(value) =>
                    form.setValue("paymentMethod", value as any, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {PAYMENT_METHOD_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  {...form.register("purpose")}
                />
              </div>{" "}
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
              </div>
              {/* Transaction Reference */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Receipt className="size-4" />
                  Transaction Reference
                </Label>

                <Input
                  placeholder="Transaction reference"
                  {...form.register("transactionReference")}
                />
              </div>
              {/* Note */}
              <div className="space-y-2 md:col-span-2">
                <Label>Note</Label>

                <Textarea
                  rows={4}
                  placeholder="Write a note..."
                  {...form.register("note")}
                />
              </div>
              {/* Donation Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  Donation Date
                </Label>

                <Input
                  type="datetime-local"
                  value={format(
                    new Date(form.watch("donatedAt")),
                    "yyyy-MM-dd'T'HH:mm"
                  )}
                  onChange={(e) =>
                    form.setValue(
                      "donatedAt",
                      new Date(e.target.value).toISOString(),
                      {
                        shouldDirty: true,
                        shouldValidate: true,
                      }
                    )
                  }
                />
              </div>
              {/* Created */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Created At</Label>

                <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                  {format(new Date(donation.createdAt), "dd MMM yyyy, hh:mm a")}
                </div>
              </div>
              {/* Updated */}
              <div className="space-y-2">
                <Label className="text-muted-foreground">Last Updated</Label>

                <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                  {format(new Date(donation.updatedAt), "dd MMM yyyy, hh:mm a")}
                </div>
              </div>
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
            />{" "}
            {isDirty && (
              <div className="flex justify-end gap-3 border-t pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>

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
    </>
  )
}
