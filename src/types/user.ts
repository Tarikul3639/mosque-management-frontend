import { USER_ROLES, USER_STATUSES } from "@/constants/user"
import type { PaginationMeta, FileReference } from "./common"

export type UserRole = (typeof USER_ROLES)[number]
export type UserStatus = (typeof USER_STATUSES)[number]

export interface User {
  id: string

  name: string
  email: string
  phone: string

  role: UserRole
  status: UserStatus

  avatar?: FileReference | null

  lastLoginAt: string | null

  createdAt: string
  updatedAt: string
}

export interface UserListResponse {
  data: User[]
  meta: PaginationMeta
}

export interface UserQuery {
  page?: number
  limit?: number

  search?: string

  role?: UserRole
  status?: UserStatus
}

export interface CreateUserDto {
  name: string
  email: string
  phone: string

  password: string

  role: UserRole

  avatarId?: string
}

export interface UpdateUserDto {
  name?: string
  email?: string
  phone?: string

  password?: string

  role?: UserRole
  status?: UserStatus

  avatarId?: string
}

export interface UserSummary {
  totalUsers: number

  statusBreakdown: {
    status: UserStatus
    count: number
  }[]

  roleBreakdown: {
    role: UserRole
    count: number
  }[]
}
