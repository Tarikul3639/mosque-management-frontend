"use client"

import { ROUTES } from "@/config/routes"
import { UsersRound, Pencil } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"
import type { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface UserDetailsHeaderProps {
  user: User
}

export function UserDetailsHeader({ user }: UserDetailsHeaderProps) {
  const router = useRouter()
  return (
    <PageHeader
      title={user.name}
      description="View complete user profile and account information."
      icon={<UsersRound className="size-6 text-primary" />}
      backLinkHref={ROUTES.ADMIN.USERS.INDEX}
      backLinkTitle="Back To Users"
      status={user.status}
      actions={
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-2 py-4"
          onClick={() => router.push(ROUTES.ADMIN.USERS.EDIT(user.id))}
        >
          <Pencil className="size-4" />
          Edit User
        </Button>
      }
    />
  )
}
