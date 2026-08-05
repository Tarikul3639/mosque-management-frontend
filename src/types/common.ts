export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: PaginationMeta
}

export interface FileReference {
  id: string
  url: string
}

export interface UserReference {
  id: string
  name: string
  email?: string
  avatarUrl?: string
}

// Upload File
export type UploadStatus = "idle" | "uploading" | "completed" | "error"

export interface UploadFile extends FileReference {
  status: UploadStatus
  progress?: number
  errorMessage?: string
}