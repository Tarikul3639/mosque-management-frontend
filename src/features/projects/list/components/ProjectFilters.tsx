"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  PROJECT_STATUS_OPTIONS,
  type ProjectStatus,
} from "@/constants/project-status"

interface ProjectFiltersProps {
  status?: ProjectStatus
  onStatusChange: (value: ProjectStatus | undefined) => void
}

export function ProjectFilters({
  status,
  onStatusChange,
}: ProjectFiltersProps) {
  return (
    <Select
      key={status ?? "all"}
      value={status ?? "all"}
      onValueChange={(value) =>
        onStatusChange(value === "all" ? undefined : (value as ProjectStatus))
      }
    >
      <SelectTrigger className="w-42">
        <SelectValue placeholder="All Status" />
      </SelectTrigger>
      <SelectContent className="p-1">
        <SelectGroup>
          <SelectLabel className="text-xs">Status</SelectLabel>
          <SelectSeparator />
          <SelectItem value="all">All Status</SelectItem>

          {PROJECT_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
