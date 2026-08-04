// src/types/monthly-fee.ts

export interface FamilyFee {
  id: string
  familyId: string
  monthlyFee: number
  startDate: string
  endDate: string | null
  createdAt: string
}

export type CurrentFamilyFee = FamilyFee

export type FamilyFeeHistory = FamilyFee

export interface CreateFamilyFeeDto {
  monthlyFee: number
  startDate: string
  endDate?: string | null
}

export interface UpdateFamilyFeeDto {
  monthlyFee?: number
  startDate?: string
  endDate?: string | null
}
