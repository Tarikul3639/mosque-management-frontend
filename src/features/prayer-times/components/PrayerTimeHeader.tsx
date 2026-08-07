"use client"

import { Clock3, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"

import { PageHeader } from "@/components/common/page-header"

interface PrayerTimeHeaderProps {
  onEdit: () => void
}

export function PrayerTimeHeader({ onEdit }: PrayerTimeHeaderProps) {
  return (
    <PageHeader
      title="Prayer Times"
      description="View and manage the mosque's daily prayer schedule."
      icon={<Clock3 className="size-6 text-primary" />}
      actions={
        <Button onClick={onEdit}>
          <Pencil className="mr-2 size-4" />
          Edit Prayer Times
        </Button>
      }
    />
  )
}
