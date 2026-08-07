"use client"

import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"

import { useRouter } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description?: string

  icon?: ReactNode
  actions?: ReactNode

  status?: string

  backLinkHref?: string
  backLinkTitle?: string
}

function formatStatusLabel(status: string) {
  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function getBadgeVariant(status: string) {
  switch (status.toUpperCase()) {
    case "ACTIVE":
      return "default"

    case "INACTIVE":
    case "SUSPENDED":
      return "destructive"

    case "PENDING":
      return "secondary"

    case "ADMIN":
    case "SUPER_ADMIN":
      return "outline"

    default:
      return "outline"
  }
}

export function PageHeader({
  title,
  description,

  icon,
  actions,

  status,

  backLinkHref,
  backLinkTitle = "Back",
}: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <div className="min-w-0 space-y-3">
        {backLinkHref && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(backLinkHref)}
            className="-ml-2 h-8 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />

            {backLinkTitle}
          </Button>
        )}

        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-primary/5 shadow-xs">
              {icon}
            </div>
          )}

          <div className="min-w-0 space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="truncate bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                {title}
              </h1>

              {status && (
                <Badge
                  variant={getBadgeVariant(status)}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                >
                  {formatStatusLabel(status)}
                </Badge>
              )}
            </div>

            {description && (
              <p className="line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {actions && (
        <div className="flex w-full flex-wrap items-center justify-start gap-2 lg:w-auto lg:justify-end">
          {actions}
        </div>
      )}
    </div>
  )
}
