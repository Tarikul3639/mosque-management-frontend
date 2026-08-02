"use client"

import Link from "next/link"
import { SearchX } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

interface NotFoundProps {
  className?: string
  icon?: React.ReactNode
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export function NotFound({
  className,
  icon,
  title = "Not Found",
  description = "The requested resource could not be found.",
  actionLabel,
  actionHref,
}: NotFoundProps) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center",
        className
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        {icon ?? <SearchX className="h-8 w-8 text-muted-foreground" />}
      </div>

      <h2 className="text-xl font-semibold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>

      {actionHref && actionLabel && (
        <Button asChild className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
