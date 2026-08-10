"use client"

import Link from "next/link"

import { ArrowLeft } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface CreateDonorHeaderProps {
  title: string
  description: string
  backHref: string

  badge?: {
    label: string
    variant: "success" | "secondary"
  }

  action?: {
    href: string
    label: string
  }
}

export function CreateDonorHeader({
  title,
  description,
  backHref,
  badge,
  action,
}: CreateDonorHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-3">
        <Button asChild variant="ghost" size="sm" className="w-fit">
          <Link href={backHref}>
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </Button>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

            {badge && <Badge variant={badge.variant}>{badge.label}</Badge>}
          </div>

          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      {action && (
        <Button asChild variant="outline">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  )
}
