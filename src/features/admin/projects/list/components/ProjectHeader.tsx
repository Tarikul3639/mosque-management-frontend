"use client"

import { ROUTES } from "@/config/routes"
import Link from "next/link"

import { FolderKanban, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { PageHeader } from "@/components/common/page-header"

export function ProjectHeader() {
  return (
    <PageHeader
      title="Projects"
      description="Manage mosque projects and monitor budgets, progress, and completion status."
      icon={<FolderKanban className="size-5 text-primary" />}
      actions={
        <Button asChild>
          <Link href={ROUTES.ADMIN.PROJECTS.CREATE}>
            <Plus className="size-4" />
            Create Project
          </Link>
        </Button>
      }
    />
  )
}
