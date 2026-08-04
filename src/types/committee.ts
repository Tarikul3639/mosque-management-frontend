import type { Designation } from "@/constants/designation"
import type { FileResource, PaginationMeta } from "./common"

export interface CommitteeMember {
  id: string

  name: string
  designation: Designation

  phone: string | null
  email: string | null

  avatar: FileResource | null
  address: string | null

  joiningDate: string
  endDate: string | null

  isActive: boolean

  createdAt: string
  updatedAt: string
}

export interface CommitteeSummary {
  totalMembers: number

  activeMembers: number
  inactiveMembers: number

  presidents: number
  vicePresidents: number

  secretaries: number
  assistantSecretaries: number

  treasurers: number

  imams: number
  muazzins: number

  members: number
}

export interface CommitteeListResponse {
  data: CommitteeMember[]
  summary: CommitteeSummary
  meta: PaginationMeta
}

export interface CommitteeQuery {
  page?: number
  limit?: number

  search?: string

  designation?: Designation

  isActive?: boolean
}

export interface CreateCommitteeDto {
  name: string

  designation: Designation

  phone?: string
  email?: string

  avatarId?: string

  address?: string

  joiningDate: string
  endDate?: string | null

  isActive?: boolean
}

export interface UpdateCommitteeDto extends Partial<CreateCommitteeDto> {}
