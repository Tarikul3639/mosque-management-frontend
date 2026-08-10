"use client"

import { ROUTES } from "@/config/routes"
import Link from "next/link"

import { ArrowLeft, Pencil } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { Donor } from "@/types/donor"

interface DonorHeaderProps {
  donor: Donor
}

export function DonorHeader({ donor }: DonorHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-3">
        <Button asChild variant="ghost" size="sm" className="w-fit">
          <Link href={ROUTES.ADMIN.DONORS.DETAIL(donor.id)}>
            <ArrowLeft className="size-4" />
            Back to Details
          </Link>
        </Button>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Edit Donor</h1>

            <Badge variant={donor.isActive ? "success" : "secondary"}>
              {donor.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          <p className="text-muted-foreground">
            Update information for{" "}
            <span className="font-medium text-foreground">{donor.name}</span>.
          </p>
        </div>
      </div>

      <Button asChild variant="outline">
        <Link href={ROUTES.ADMIN.DONORS.DETAIL(donor.id)}>
          <Pencil className="size-4" />
          View Details
        </Link>
      </Button>
    </div>
  )
}
