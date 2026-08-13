import { api } from "@/lib/axios"

/* -------------------------------------------------------------------------- */
/*                                   Queries                                  */
/* -------------------------------------------------------------------------- */

export interface FamiliesQueryParams {
  page?: number
  limit?: number
  search?: string
}

export interface FamilyLedgerQueryParams {
  year?: number
  month?: number
}

/* -------------------------------------------------------------------------- */
/*                                   Family                                   */
/* -------------------------------------------------------------------------- */

export interface FamilyAvatar {
  id: string
  url: string
}

export interface Family {
  id: string
  familyNo: string
  headName: string
  phone: string | null
  email: string | null
  address: string
  avatar: FamilyAvatar | null
  isActive: boolean
}

export interface GetFamiliesResponse {
  data: Family[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/* -------------------------------------------------------------------------- */
/*                              Family Details                                */
/* -------------------------------------------------------------------------- */

export interface CurrentFee {
  id: string
  monthlyFee: number
  startDate: string
  endDate: string | null
}

export interface PaymentSummary {
  totalCharge: number
  totalPaid: number
  totalDue: number
  lastPaymentAt: string | null
}

export interface FamilyDetails extends Family {
  createdAt: string
  updatedAt: string
  currentFee: CurrentFee | null
  paymentSummary: PaymentSummary
}

/* -------------------------------------------------------------------------- */
/*                               Family Ledger                                */
/* -------------------------------------------------------------------------- */

export interface LedgerPayment {
  id: string
  amount: number
  method: string
  reference: string | null
  note: string | null
  paidAt: string
}

export interface LedgerItem {
  monthlyChargeId: string
  year: number
  month: number
  chargeAmount: number
  paidAmount: number
  dueAmount: number
  status: string
  payments: LedgerPayment[]
}

export interface FamilyLedger {
  familyId: string
  familyNo: string
  headName: string
  phone: string | null
  address: string

  summary: {
    totalCharge: number
    totalPaid: number
    totalDue: number
  }

  ledger: LedgerItem[]
}

/* -------------------------------------------------------------------------- */
/*                                   APIs                                     */
/* -------------------------------------------------------------------------- */

export async function getFamilies(
  params: FamiliesQueryParams = {}
): Promise<GetFamiliesResponse> {
  const { data } = await api.get<GetFamiliesResponse>("/families", {
    params,
  })

  return data
}

export async function getFamilyDetails(
  familyId: string
): Promise<FamilyDetails> {
  const { data } = await api.get<FamilyDetails>(`/families/${familyId}`)

  return data
}

export async function getFamilyLedger(
  familyId: string,
  params: FamilyLedgerQueryParams = {}
): Promise<FamilyLedger> {
  const { data } = await api.get<FamilyLedger>(
    `/payments/family/${familyId}/ledger`,
    {
      params,
    }
  )

  return data
}
