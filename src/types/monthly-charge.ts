import { PaymentStatus } from "@/types/payment"

export interface MonthlyCharge {
  id: string

  familyId: string
  familyNo: string
  headName: string

  year: number
  month: number

  amount: number
  paidAmount: number

  status: PaymentStatus

  dueDate: string
  paidAt: string | null

  createdAt: string
  updatedAt: string
}

// Metadata
export interface MonthlyChargeListMetadata {
  total: number
  page: number
  limit: number

  totalPages: number

  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface MonthlyChargeListResponse {
  data: MonthlyCharge[]
  metadata: MonthlyChargeListMetadata
}

export interface MonthlyChargeQuery {
  page?: number;
  limit?: number;
  search?: string;

  familyId?: string;

  year?: number;
  month?: number;

  status?: PaymentStatus;
  activeOnly?: boolean;
  outstandingOnly?: boolean;
}

export interface UpdateMonthlyChargeDto {
  amount?: number
  paymentId?: string
  dueDate?: string
}

export interface GenerateMonthlyChargeDto {
  year: number
  month: number
}

export interface GenerateMonthlyChargeResponse {
  message: string

  totalFamilies: number

  generatedCharges: number

  skippedCharges: number

  year: number
  month: number
}
