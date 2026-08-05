// src/components/common/page-header.tsx

"use client"

import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  actions?: ReactNode
  isActive?: boolean
  backLinkHref?: string
  backLinkTitle?: string
}

export function PageHeader({
  title,
  description,
  isActive,
  icon,
  actions,
  backLinkTitle = "Back To Home",
  backLinkHref,
}: PageHeaderProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col flex-wrap items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-2">
        {/* Back Link */}
        <div className="space-y-2">
          {backLinkHref && (
            <Button
              onClick={() => router.replace(backLinkHref)}
              variant="ghost"
              size="sm"
              className="-ml-2 h-8 gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              {backLinkTitle}
            </Button>
          )}

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex size-11 items-center justify-center rounded-lg border bg-primary/5">
                  {icon}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="line-clamp-1 bg-linear-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
                  {title}
                </h1>

                {isActive !== undefined && (
                  <Badge
                    variant={isActive ? "default" : "destructive"}
                    className="rounded-full px-2.5 py-0.5 text-xs"
                  >
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                )}
              </div>
            </div>

            {description && (
              <p className="line-clamp-2 text-xs text-muted-foreground/80 sm:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  )
}
