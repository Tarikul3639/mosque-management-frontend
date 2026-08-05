"use client"

import Link from "next/link"

import { ArrowLeft, Pencil, FolderKanban } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { PageHeader } from "@/components/common/page-header"

import {
  PROJECT_STATUS,
  getProjectStatusLabel,
} from "@/constants/project-status"

import type { Project } from "@/types/project"

interface ProjectDetailsHeaderProps {
  project: Project
}

export function ProjectDetailsHeader({ project }: ProjectDetailsHeaderProps) {
  return (
    <PageHeader
      backLinkHref="/projects"
      backLinkTitle="Back to Projects"
      title={project.title}
      description={project.description ?? "No description available."}
      icon={<FolderKanban className="size-5 text-primary" />}
      actions={
        <Button asChild>
          <Link href={`/projects/${project.id}/edit`}>
            <Pencil className="size-4" />
            Edit Project
          </Link>
        </Button>
      }
    />
  )
}
