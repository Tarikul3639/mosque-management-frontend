import { api } from "@/lib/axios"

import type {
  Project,
  ProjectListResponse,
  ProjectQuery,
} from "@/types/project"

/* -------------------------------------------------------------------------- */
/*                                  Queries                                   */
/* -------------------------------------------------------------------------- */

export async function getProjects(
  params: ProjectQuery = {}
): Promise<ProjectListResponse> {
  const { data } = await api.get<ProjectListResponse>("/projects", {
    params,
  })

  return data
}

/* -------------------------------------------------------------------------- */
/*                              Project Details                               */
/* -------------------------------------------------------------------------- */

export async function getProjectDetails(projectId: string): Promise<Project> {
  const { data } = await api.get<Project>(`/projects/${projectId}`)

  return data
}
