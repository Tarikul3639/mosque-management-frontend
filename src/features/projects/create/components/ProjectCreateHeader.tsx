"use client"

import { ROUTES } from "@/config/routes"
import { FolderPlus } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"

export function ProjectCreateHeader() {
  return (
    <PageHeader
      title="Create Project"
      description="Create a new project with budget, timeline, progress and gallery."
      icon={<FolderPlus className="size-6 text-primary" />}
      backLinkHref={ROUTES.ADMIN.PROJECTS.INDEX}
      backLinkTitle="Back to Projects"
    />
  )
}
