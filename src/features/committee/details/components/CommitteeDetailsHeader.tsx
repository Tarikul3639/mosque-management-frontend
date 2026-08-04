"use client"

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
      backLinkHref="/committee"
      backLinkTitle="Back to Committee"
      isActive={isActive}
      actions={
        <Button asChild>
          <Link href={`/committee/${id}/edit`}>
            <Pencil className="mr-2 size-4" />
            Edit Member
          </Link>
        </Button>
      }
    />
  )
}
