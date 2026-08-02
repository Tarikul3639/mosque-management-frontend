"use client"

import Link from "next/link"
import { Plus, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DonorsHeaderProps {
  totalDonors?: number
}

export function DonorsHeader({ totalDonors = 0 }: DonorsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Donors</h1>

          <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1">
            <Users className="size-3.5" />
            {totalDonors}
          </Badge>
        </div>

        <p className="max-w-2xl text-sm text-muted-foreground">
          Manage donor profiles, update information, and keep donor records
          organized.
        </p>
      </div>

      <Button asChild>
        <Link href="/donors/create">
          <Plus className="size-4" />
          Add Donor
        </Link>
      </Button>
    </div>
  )
}
