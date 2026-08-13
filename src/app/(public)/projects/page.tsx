import type { Metadata } from "next"

import { SITE_CONFIG } from "@/config/metadata"
import { ProjectPage } from "@/features/public/projects/list/ProjectPage"

import type { ProjectQuery } from "@/types/project"

interface ProjectsPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    search?: string
    status?: ProjectQuery["status"]
  }>
}

export const metadata: Metadata = {
  title: "উন্নয়ন প্রকল্পসমূহ",
  description:
    "মসজিদের সকল উন্নয়ন প্রকল্প, বাজেট, ব্যয়, অগ্রগতি এবং বর্তমান অবস্থা দেখুন।",
  keywords: [
    ...SITE_CONFIG.keywords,
    "Projects",
    "Development Projects",
    "Mosque Projects",
    "Project Progress",
    "Project Budget",
    "উন্নয়ন প্রকল্প",
    "মসজিদ উন্নয়ন",
    "প্রকল্পের অগ্রগতি",
    "প্রকল্প বাজেট",
  ],
  alternates: {
    canonical: "/projects",
  },
}

const PROJECT_STATUSES: NonNullable<ProjectQuery["status"]>[] = [
  "PLANNING",
  "RUNNING",
  "COMPLETED",
  "CANCELLED",
]

function getProjectStatus(status?: string): ProjectQuery["status"] {
  if (
    status &&
    PROJECT_STATUSES.includes(status as NonNullable<ProjectQuery["status"]>)
  ) {
    return status as ProjectQuery["status"]
  }

  return undefined
}

export default async function Page({ searchParams }: ProjectsPageProps) {
  const params = await searchParams

  return (
    <ProjectPage
      page={Number(params.page) || 1}
      limit={Number(params.limit) || 9}
      search={params.search?.trim() || undefined}
      status={getProjectStatus(params.status)}
    />
  )
}
