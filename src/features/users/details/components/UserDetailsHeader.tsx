"use client"

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
      backLinkHref="/users"
      backLinkTitle="Back To Users"
      status={user.status}
      actions={
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-2 py-4"
          onClick={() => router.push(`/users/${user.id}/edit`)}
        >
          <Pencil className="size-4" />
          Edit User
        </Button>
      }
    />
  )
}
