// src/types/donor.ts

export interface DonorAvatar {
  id: string
  url: string
}

export interface Donor {
  id: string
  name: string
  phone: string
  email: string | null
  avatar: DonorAvatar | null
  address: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface GetDonorsParams {
  page?: number
  limit?: number
  search?: string
  isActive?: boolean
}

export interface GetDonorsResponse {
  data: Donor[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CreateDonorRequest {
  name: string
  phone: string
  email?: string
  address?: string
  avatarId?: string
  isActive: boolean
}

export interface UpdateDonorRequest {
  name?: string
  phone?: string
  email?: string
  address?: string
  avatarId?: string
  isActive?: boolean
}

export type CreateDonorResponse = Donor
export type GetDonorResponse = Donor
export type UpdateDonorResponse = Donor
export type DeleteDonorResponse = void
