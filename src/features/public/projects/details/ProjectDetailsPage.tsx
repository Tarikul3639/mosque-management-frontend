import { Suspense } from "react"

import { ProjectContent } from "./components/ProjectContent"
import { ProjectDetailsHeader } from "./components/ProjectDetailsHeader"
import { ProjectDetailsSkeleton } from "./components/ProjectDetailsSkeleton"

interface ProjectDetailsPageProps {
  projectId: string
}

export function ProjectDetailsPage({ projectId }: ProjectDetailsPageProps) {
  return (
    <main>
      <ProjectDetailsHeader />

      <Suspense fallback={<ProjectDetailsSkeleton />}>
        <ProjectContent projectId={projectId} />
      </Suspense>
    </main>
  )
}
