import { Suspense } from "react"

import type { ProjectQuery } from "@/types/project"

import { ProjectBanner } from "./components/ProjectBanner"
import { ProjectCardSkeletonGrid } from "./components/ProjectCardSkeleton"
import { ProjectsContent } from "./components/ProjectsContent"
import { ProjectToolbar } from "./components/ProjectToolbar"

interface ProjectPageProps extends ProjectQuery {
  page: number
  limit: number
}

export function ProjectPage({ page, limit, search, status }: ProjectPageProps) {
  return (
    <main>
      <ProjectBanner />

      <ProjectToolbar currentSearch={search} currentStatus={status} />

      <Suspense
        key={`${page}-${limit}-${search ?? ""}-${status ?? ""}`}
        fallback={<ProjectCardSkeletonGrid count={limit} />}
      >
        <ProjectsContent
          page={page}
          limit={limit}
          search={search}
          status={status}
        />
      </Suspense>
    </main>
  )
}
