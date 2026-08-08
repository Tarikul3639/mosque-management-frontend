"use client"

import { ROUTES } from "@/config/routes"
import { Plus, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"

export function CommitteeHeader({ total }: { total: number }) {
  return (
    <PageHeader
      title="Committee Members"
      description="Manage mosque committee members and their responsibilities."
      icon={
        <div className="relative">
          <Users className="size-5" />

          {/* Absolute Count Badge */}
          <div className="absolute -top-5 -right-5 flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground shadow-lg ring-2 ring-background/50 transition-transform hover:scale-105">
            {total}
          </div>
        </div>
      }
      actions={
        <Button asChild>
          <Link href={ROUTES.ADMIN.COMMITTEE.CREATE}>
            <Plus className="mr-2 size-4" />
            Add Member
          </Link>
        </Button>
      }
    />
  )
}
