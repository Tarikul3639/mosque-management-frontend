"use client"

import { ArrowLeft, UserRoundPlus } from "lucide-react"
import { PageHeader } from "@/components/common/page-header"

export function CommitteeCreateHeader() {
  return (
    <PageHeader
      title="Create Committee Member"
      description="Add a new committee member to the mosque management system."
      backLinkTitle="Back to Committee Members"
      backLinkHref="/committee"
      icon={<UserRoundPlus strokeWidth={2.5} className="size-6" />}
    />
  )
}
