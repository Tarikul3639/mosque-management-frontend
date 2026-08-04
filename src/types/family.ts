import { FileResource } from "./common"

export interface FamilyDetails {
  id: string
  familyNo: string
  headName: string
  phone: string | null
  email: string | null
  address: string | null
  avatar: FileResource | null
  isActive: boolean
  currentFee: {
    monthlyFee: number
  } | null
  paymentSummary: {
    totalPaid: number
    totalDue: number
    lastPaymentAt: string | null
  }
  createdAt: string
  updatedAt: string
}

export interface Family {
  id: string
  familyNo: string
  headName: string
  email: string | null
  phone: string
  address: string
  avatar: FileResource | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface FamilyStats {
  totalFamilies: number
  activeFamilies: number
  inactiveFamilies: number
  newFamiliesThisMonth: number
}

export interface FamilyListResponse {
  data: Family[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface FamilyQuery {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
  sortBy?: "familyNo" | "headName" | "createdAt" | "updatedAt"
  sortOrder?: "asc" | "desc"
}

export interface CreateFamilyPayload {
  familyNo?: string
  headName: string
  phone: string
  email?: string
  address?: string
  avatarId?: string
  isActive?: boolean
}

export interface UpdateFamilyPayload extends Partial<CreateFamilyPayload> {}
