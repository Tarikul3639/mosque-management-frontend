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

export interface FileResource {
  id: string
  url: string
}

export interface UserReference {
  id: string
  name: string
  email?: string
  avatarUrl?: string
}
