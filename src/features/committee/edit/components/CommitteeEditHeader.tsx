"use client"

import Link from "next/link"

import { ArrowLeft, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"

import { PageHeader } from "@/components/common/page-header"

import { getDesignationLabel } from "@/constants/designation"

interface CommitteeEditHeaderProps {
  id: string
  name: string
  designation: string
}

export function CommitteeEditHeader({
  id,
  name,
  designation,
}: CommitteeEditHeaderProps) {
  return (
    <PageHeader
      title="Edit Committee Member"
      description={`${name} • ${getDesignationLabel(designation as never)}`}
      backLinkHref={`/committee`}
      backLinkTitle="Back to Committee"
      actions={
        <Button variant="outline" asChild>
          <Link href={`/committee/${id}`}>
            <Eye className="mr-2 size-4" />
            View Member
          </Link>
        </Button>
      }
    />
  )
}
