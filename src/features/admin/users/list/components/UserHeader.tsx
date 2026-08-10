"use client"

import { ROUTES } from "@/config/routes"
import { UsersRound, UserPlus } from "lucide-react"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import { PageHeader } from "@/components/common/page-header"

export function UserHeader() {
  const router = useRouter()

  return (
    <PageHeader
      title="Users"
      description="Manage administrators and user accounts for the mosque management system."
      icon={<UsersRound className="size-6 text-primary" />}
      actions={
        <Button onClick={() => router.push(ROUTES.ADMIN.USERS.CREATE)}>
          <UserPlus className="mr-0.5 size-4" />
          Add User
        </Button>
      }
    />
  )
}
