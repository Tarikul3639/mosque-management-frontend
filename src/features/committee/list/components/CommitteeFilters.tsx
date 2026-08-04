"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { DESIGNATION_OPTIONS } from "@/constants/designation"
import type { Designation } from "@/constants/designation"

interface CommitteeFiltersProps {
  designation?: Designation
  isActive?: boolean
  onDesignationChange: (value?: Designation) => void
  onStatusChange: (value?: boolean) => void
}

export function CommitteeFilters({
  designation,
  isActive,
  onDesignationChange,
  onStatusChange,
}: CommitteeFiltersProps) {
  return (
    <>
      <Select
        value={designation}
        onValueChange={(value) =>
          onDesignationChange(value ? (value as Designation) : undefined)
        }
      >
        <SelectTrigger className="w-full lg:w-56">
          <SelectValue placeholder="Designation" />
        </SelectTrigger>

        <SelectContent className="p-2">
          <SelectItem value="" disabled>
            All Designations
          </SelectItem>
          <SelectSeparator />
          {DESIGNATION_OPTIONS.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={
          isActive === undefined ? "all" : isActive ? "active" : "inactive"
        }
        onValueChange={(value) => {
          if (value === "all") {
            onStatusChange(undefined)
          } else {
            onStatusChange(value === "active")
          }
        }}
      >
        <SelectTrigger className="w-full lg:w-44">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent className="p-2">
          <SelectItem value="" disabled>
            Status
          </SelectItem>
          <SelectSeparator />
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
