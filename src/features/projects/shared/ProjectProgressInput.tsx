"use client"

import { TrendingUp } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ProjectProgressInputProps {
  value: number

  onChange: (value: number) => void
}

export function ProjectProgressInput({
  value,
  onChange,
}: ProjectProgressInputProps) {
  return (
    <div className="space-y-3">
      <Label className="flex items-center gap-2">
        <TrendingUp className="size-4" />
        Progress
      </Label>

      <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
        <div className="flex items-center gap-4">
          <Input
            type="number"
            min={0}
            max={100}
            value={value}
            onChange={(e) =>
              onChange(Math.min(100, Math.max(0, Number(e.target.value) || 0)))
            }
            className="w-28"
          />

          <span className="text-sm font-medium">%</span>
        </div>

        <Progress value={value} className="h-2.5" />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Not Started</span>

          <span>{value}% Complete</span>

          <span>Completed</span>
        </div>
      </div>
    </div>
  )
}
