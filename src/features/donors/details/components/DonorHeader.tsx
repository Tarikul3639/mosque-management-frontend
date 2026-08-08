"use client"

import { ROUTES } from "@/config/routes"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Pencil } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import type { Donor } from "@/types/donor"

interface DonorHeaderProps {
  donor: Donor
}

export function DonorHeader({ donor }: DonorHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-4 border-b border-border/50 pb-5 sm:justify-between lg:flex-row lg:items-center">
      <div className="space-y-2">
        <Button
          onClick={() => router.replace(ROUTES.ADMIN.DONORS.INDEX)}
          variant="ghost"
          size="sm"
          className="-ml-2 h-8 gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to Donors
        </Button>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
            {donor.name}
          </h1>

          <Badge
            variant={donor.isActive ? "default" : "destructive"}
            className="rounded-full px-2.5 py-0.5 text-xs"
          >
            {donor.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground/80 sm:text-sm">
          View donor profile, contact information, and donation activity.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild>
          <Link href={ROUTES.ADMIN.DONORS.EDIT(donor.id)}>
            <Pencil className="mr-2 size-4" />
            Edit Donor
          </Link>
        </Button>
      </div>
    </div>
  )
}
