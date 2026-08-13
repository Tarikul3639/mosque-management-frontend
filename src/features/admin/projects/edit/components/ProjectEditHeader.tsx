"use client"

import { ROUTES } from "@/config/routes"
import { FolderPen, Eye } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"

import type { Project } from "@/types/project"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"

interface ProjectEditHeaderProps {
  project: Project
}

export function ProjectEditHeader({ project }: ProjectEditHeaderProps) {
  const router = useRouter()

  return (
    <PageHeader
      title={`Edit ${project.title}`}
      description="Update project information, financial details, timeline, and gallery."
      icon={<FolderPen className="size-6 text-primary" />}
      backLinkHref={ROUTES.ADMIN.PROJECTS.DETAIL(project.id)}
      backLinkTitle="Back to Project"
      actions={
        <Button
          onClick={() =>
            router.replace(ROUTES.ADMIN.PROJECTS.DETAIL(project.id))
          }
        >
          <Eye className="mr-2 size-4" />
          View Project
        </Button>
      }
    />
  )
}
