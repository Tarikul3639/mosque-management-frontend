"use client"

import { ROUTES } from "@/config/routes"
import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function FamilyCreateHeader() {
  return (
    <div className="border-b border-border/50 pb-5">
      <div className="space-y-2">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          <Link href={ROUTES.ADMIN.FAMILIES.INDEX}>
            <ArrowLeft className="size-3.5" />
            Back to Families
          </Link>
        </Button>

        <div className="flex items-center gap-2">
          <Plus className="size-7 text-primary" strokeWidth={3} />

          <h1 className="bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
            Create Family
          </h1>
        </div>

        <p className="max-w-2xl text-sm text-muted-foreground">
          Add a new family by entering their basic information, contact details,
          and profile photo.
        </p>
      </div>
    </div>
  )
}
