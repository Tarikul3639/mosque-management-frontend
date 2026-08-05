"use client"

import type { UseFormReturn } from "react-hook-form"

import { Wallet, TrendingUp, BarChart3 } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import type { ProjectFormValues } from "@/schemas/project.schema"

interface ProjectBudgetCardProps {
  form: UseFormReturn<ProjectFormValues>
}

export function ProjectBudgetCard({
  form,
}: ProjectBudgetCardProps) {
  const {
    register,
    formState: { errors },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Budget Information
        </CardTitle>
      </CardHeader>

      <CardContent className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Wallet className="size-4" />
            Budget
          </Label>

          <Input
            type="number"
            min={0}
            {...register("budget", {
              valueAsNumber: true,
            })}
          />

          {errors.budget && (
            <p className="text-xs text-destructive">
              {errors.budget.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <TrendingUp className="size-4" />
            Spent
          </Label>

          <Input
            type="number"
            min={0}
            {...register("spent", {
              valueAsNumber: true,
            })}
          />

          {errors.spent && (
            <p className="text-xs text-destructive">
              {errors.spent.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <BarChart3 className="size-4" />
            Progress (%)
          </Label>

          <Input
            type="number"
            min={0}
            max={100}
            {...register("progress", {
              valueAsNumber: true,
            })}
          />

          {errors.progress && (
            <p className="text-xs text-destructive">
              {errors.progress.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}