import type { Metadata } from "next"
import { ProjectDetailsPage } from "@/features/admin/projects/details/ProjectDetailsPage"

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: "Project Details",
  description: "View mosque development project details.",
}

export default async function Page({ params }: ProjectPageProps) {
  const { id } = await params

  return <ProjectDetailsPage id={id} />
}
