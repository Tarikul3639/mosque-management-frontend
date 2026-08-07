"use client"

import { CalendarDays, Mail, MapPin, Phone } from "lucide-react"

import type { UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { AvatarUpload } from "@/components/common/avatar-upload/avatar-upload"
import { DESIGNATION_OPTIONS } from "@/constants/designation"
import type { CommitteeFormValues } from "@/schemas/committee.schema"
import { UploadFile } from "@/types/common"

interface CommitteeFormProps {
  title: string
  submitText: string
  form: UseFormReturn<CommitteeFormValues>
  isSubmitting: boolean
  avatar?: UploadFile | null
  onAvatarChange?: (file: File) => void
  onSubmit: (values: CommitteeFormValues) => Promise<void>
  onClear?: () => void
}

export function CommitteeForm({
  title,
  submitText,
  form,
  isSubmitting,
  avatar,
  onAvatarChange,
  onSubmit,
  onClear,
}: CommitteeFormProps) {
  const {
    register,
    watch,
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-center">
            <AvatarUpload
              name={watch("name") || "Committee Member"}
              image={avatar?.url}
              isEditable
              onChange={onAvatarChange}
              uploading={avatar?.status === "uploading"}
              progress={avatar?.progress}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <Label>Name</Label>

              <Input
                placeholder="Enter name"
                {...register("name", {
                  onChange: () => trigger("name"),
                })}
              />

              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Designation */}
            <div className="space-y-2">
              <Label>Designation</Label>

              <Select
                key={watch("designation")}
                value={watch("designation")}
                onValueChange={(value) => {
                  setValue("designation", value as never, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                  trigger("designation")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>

                <SelectContent className="p-2">
                  <SelectItem value="" disabled>
                    Select designation
                  </SelectItem>
                  <SelectSeparator />
                  {DESIGNATION_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {errors.designation && (
                <p className="text-xs text-destructive">
                  {errors.designation.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="size-4" />
                Phone
              </Label>

              <Input
                placeholder="Enter phone number"
                {...register("phone", {
                  onChange: () => trigger("phone"),
                })}
              />

              {errors.phone && (
                <p className="text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </Label>

              <Input
                placeholder="Enter email address"
                type="email"
                {...register("email", {
                  onChange: () => trigger("email"),
                })}
              />

              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Joining Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                Joining Date
              </Label>

              <Input
                placeholder="Select joining date"
                type="date"
                {...register("joiningDate", {
                  onChange: () => trigger("joiningDate"),
                })}
              />

              {errors.joiningDate && (
                <p className="text-xs text-destructive">
                  {errors.joiningDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                End Date
              </Label>

              <Input
                placeholder="Select end date"
                type="date"
                {...register("endDate", {
                  onChange: () => trigger("endDate"),
                })}
              />

              {errors.endDate && (
                <p className="text-xs text-destructive">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2">
                <MapPin className="size-4" />
                Address
              </Label>

              <Input
                placeholder="Enter address"
                {...register("address", {
                  onChange: () => trigger("address"),
                })}
              />

              {errors.address && (
                <p className="text-xs text-destructive">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Active */}
            <div className="flex items-center justify-between rounded-lg border p-4 md:col-span-2">
              <div>
                <p className="font-medium">Active</p>

                <p className="text-sm text-muted-foreground">
                  Allow this committee member to appear in the active list.
                </p>
              </div>

              <Switch
                checked={watch("isActive")}
                onCheckedChange={(value) =>
                  setValue("isActive", value, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-6">
            {onClear && (
              <Button type="button" variant="outline" onClick={onClear}>
                Clear
              </Button>
            )}

            <Button type="submit" disabled={isSubmitting || !isDirty}>
              {submitText}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
