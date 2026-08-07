"use client"

import { ShieldPlus } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"

export function UserCreateHeader() {
  return (
    <PageHeader
      title="Create User"
      description="Create a new administrator or user account for the mosque management system."
      icon={<ShieldPlus className="size-5 text-primary" />}
      backLinkHref="/users"
      backLinkTitle="Back to Users"
    />
  )
}
