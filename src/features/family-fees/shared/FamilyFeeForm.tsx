"use client"

// src/features/families/details/components/FamilyFeeForm.tsx
import { format } from "date-fns"
import { CalendarDays, Wallet } from "lucide-react"

import { Controller, type UseFormReturn } from "react-hook-form"

import { Card, CardContent } from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { FamilyFeeFormValues } from "@/schemas/family-fee.schema"

interface FamilyFeeFormProps {
  form: UseFormReturn<FamilyFeeFormValues>
}

export function FamilyFeeForm({ form }: FamilyFeeFormProps) {
  const {
    register,
    watch,
    setValue,

    formState: { errors },
  } = form

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-6 p-3">
        <div className="space-y-6">
          {/* Monthly Fee */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Wallet className="size-4" />
              Monthly Fee
            </Label>

            <Input
              type="number"
              min={0}
              step="0.01"
              placeholder="Enter monthly fee"
              {...register("monthlyFee", {
                valueAsNumber: true,
              })}
            />

            {errors.monthlyFee && (
              <p className="text-xs text-destructive">
                {errors.monthlyFee.message}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Start Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                Start Date
              </Label>

              <Input
                type="date"
                value={
                  watch("startDate")
                    ? format(new Date(watch("startDate")), "yyyy-MM-dd")
                    : ""
                }
                onChange={(e) =>
                  setValue(
                    "startDate",
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

              {errors.startDate && (
                <p className="text-xs text-destructive">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                End Date
              </Label>

              <Controller
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <Input
                    type="date"
                    value={
                      field.value
                        ? format(new Date(field.value), "yyyy-MM-dd")
                        : ""
                    }
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          ? new Date(e.target.value).toISOString()
                          : null
                      )
                    }
                  />
                )}
              />

              {errors.endDate && (
                <p className="text-xs text-destructive">
                  {errors.endDate.message}
                </p>
              )}

              <p className="text-xs text-muted-foreground">
                Leave empty if this fee is still active.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
