// src/features/donations/create/components/DonationCreateHeader.tsx

"use client"

import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DonationCreateHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-9 rounded-full"
          >
            <Link href="/donations">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Create Donation
            </h1>

            <p className="text-sm text-muted-foreground">
              Register a new donation for the mosque.
            </p>
          </div>
        </div>
      </div>

      <Button type="submit" form="donation-form" className="gap-2">
        <Plus className="size-4" />
        Create Donation
      </Button>
    </div>
  )
}
