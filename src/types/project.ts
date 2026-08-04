import type {
  FileResource,
  PaginationMeta,
  UserReference,
} from "./common"

import type { ProjectStatus } from "@/constants/project-status"

export interface Project {
  id: string
  title: string
  description: string | null
  budget: number
  spent: number
  progress: number
  status: ProjectStatus
  images: FileResource[]
  startDate: string | null
  endDate: string | null
  createdBy: UserReference | null
  updatedBy: UserReference | null
  createdAt: string
  updatedAt: string
}

export interface ProjectSummary {
  totalProjects: number
  planningProjects: number
  runningProjects: number
  completedProjects: number
  cancelledProjects: number
  totalBudget: number
  totalSpent: number
}

export interface ProjectListResponse {
  data: Project[]
  meta: PaginationMeta
}

export interface ProjectQuery {
  page?: number
  limit?: number
  search?: string
  status?: ProjectStatus
}

export interface CreateProjectDto {
  title: string
  description?: string
  budget: number
  spent?: number
  progress?: number
  status: ProjectStatus
  imageIds?: string[]
  startDate?: string
  endDate?: string
}

export interface UpdateProjectDto
  extends Partial<CreateProjectDto> {}