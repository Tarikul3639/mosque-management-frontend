// src/components/common/page-header.tsx

"use client"

import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function PageHeader({
  title,
  description,
  icon,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col flex-wrap items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex size-12 items-center justify-center rounded-xl border bg-muted/40">
            {icon}
          </div>
        )}

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {action && (
        <div className="flex flex-wrap items-center gap-2">{action}</div>
      )}
    </div>
  )
}
