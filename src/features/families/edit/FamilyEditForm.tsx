"use client"

import { format } from "date-fns"
import {
  CalendarDays,
  Coins,
  Hash,
  Loader2,
  MapPin,
  Phone,
  User,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import type { FamilyDetails } from "@/types/family"
import type { FamilyFormValues } from "@/schemas/family.schema"

import { UseFormReturn } from "react-hook-form"

interface FamilyEditFormProps {
  family: FamilyDetails
  form: UseFormReturn<FamilyFormValues>
  onSubmit: (values: FamilyFormValues) => Promise<void>
  isSubmitting: boolean
}

export function FamilyEditForm({
  family,
  form,
  onSubmit,
  isSubmitting,
}: FamilyEditFormProps) {
  const {
    formState: { isDirty },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Family</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField icon={<Hash className="size-4" />} label="Family Number">
              <Input placeholder="Family Number" {...form.register("familyNo")} />
            </FormField>

            <FormField icon={<User className="size-4" />} label="Head Name">
              <Input placeholder="Head Name" {...form.register("headName")} />
            </FormField>

            <FormField icon={<Phone className="size-4" />} label="Phone Number">
              <Input placeholder="Phone Number" {...form.register("phone")} />
            </FormField>

            <FormField icon={<User className="size-4" />} label="Email">
              <Input placeholder="Email" {...form.register("email")} />
            </FormField>

            <FormField icon={<MapPin className="size-4" />} label="Address">
              <Input placeholder="Address" {...form.register("address")} />
            </FormField>

            <FormField icon={<Coins className="size-4" />} label="Monthly Fee">
              <Input
                type="number"
                defaultValue={family.currentFee?.monthlyFee ?? ""}
                disabled
              />
            </FormField>

            <div className="space-y-3">
              <Label>Status</Label>

              <div className="flex h-10 items-center justify-between rounded-md border px-3">
                <span className="text-sm">Active Family</span>

                <Switch
                  checked={form.watch("isActive")}
                  onCheckedChange={(checked) =>
                    form.setValue("isActive", checked, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="grid gap-5 border-t pt-6 md:grid-cols-2">
            <ReadOnlyField
              icon={<CalendarDays className="size-4" />}
              label="Created At"
              value={format(family.createdAt, "dd MMM yyyy, hh:mm a")}
            />

            <ReadOnlyField
              icon={<CalendarDays className="size-4" />}
              label="Last Updated"
              value={format(family.updatedAt, "dd MMM yyyy, hh:mm a")}
            />
          </div>

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
  )
}

interface FormFieldProps {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}

function FormField({ icon, label, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        {icon}
        {label}
      </Label>

      {children}
    </div>
  )
}

interface ReadOnlyFieldProps {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}

function ReadOnlyField({ icon, label, value }: ReadOnlyFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-muted-foreground">
        {icon}
        {label}
      </Label>

      <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
        {value}
      </div>
    </div>
  )
}
