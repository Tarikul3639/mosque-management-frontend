"use client"

import { ROUTES } from "@/config/routes"
import { Pencil, ShieldCheck } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"

import type { User } from "@/types/user"

interface UserEditHeaderProps {
  user: User
}

export function UserEditHeader({ user }: UserEditHeaderProps) {
  return (
    <PageHeader
      title={`Edit ${user.name}`}
      description="Update user account information, permissions, and profile settings."
      icon={<Pencil className="size-6 text-primary" />}
      status={user.status}
      backLinkHref={ROUTES.ADMIN.USERS.DETAIL(user.id)}
      backLinkTitle="Back to Details"
      actions={
        <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
          <ShieldCheck className="size-4 text-primary" />

          <span className="text-sm font-medium">
            {user.role === "SUPER_ADMIN" ? "Super Admin" : "Administrator"}
          </span>
        </div>
      }
    />
  )
}
