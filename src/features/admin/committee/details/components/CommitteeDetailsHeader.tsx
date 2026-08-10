"use client"

import { ROUTES } from "@/config/routes"
import { Pencil } from "lucide-react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"

interface CommitteeDetailsHeaderProps {
  id: string
  name: string
  designation: string
  isActive: boolean
}

export function CommitteeDetailsHeader({
  id,
  name,
  designation,
  isActive,
}: CommitteeDetailsHeaderProps) {
  return (
    <PageHeader
      title={name}
      description="Committee member details and information."
      backLinkHref={ROUTES.ADMIN.COMMITTEE.INDEX}
      backLinkTitle="Back to Committee"
      status={isActive ? "Active" : "Inactive"}
      actions={
        <Button asChild>
          <Link href={ROUTES.ADMIN.COMMITTEE.EDIT(id)}>
            <Pencil className="mr-2 size-4" />
            Edit Member
          </Link>
        </Button>
      }
    />
  )
}
