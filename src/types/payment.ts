/* =========================
 * Enums
 * ========================= */

export enum PaymentStatus {
  DUE = "DUE",
  PAID = "PAID",
  PARTIAL = "PARTIAL",
}

export enum PaymentMethod {
  CASH = "CASH",
  BKASH = "BKASH",
  NAGAD = "NAGAD",
  BANK_TRANSFER = "BANK_TRANSFER",
  CARD = "CARD",
  QR = "QR",
  OTHER = "OTHER",
}

/* =========================
 * Common Sub-interfaces
 * ========================= */

export interface PaymentUser {
  id: string
  name: string
}

/* =========================
 * Payment
 * ========================= */

export interface Payment {
  id: string

  familyId: string
  familyNo: string
  headName: string

  monthlyChargeId: string

  year: number
  month: number

  chargeAmount: number

  paymentAmount: number

  paidAmount: number

  status: PaymentStatus

  method: PaymentMethod

  reference: string | null
  note: string | null

  createdBy: PaymentUser
  updatedBy: PaymentUser

  paidAt: string | Date

  createdAt: string | Date
  updatedAt: string | Date
}

/* =========================
 * Payment Summary
 * ========================= */

export interface PaymentSummary {
  totalFamilies: number

  totalCharges: number

  paidCharges: number
  partialCharges: number
  dueCharges: number

  totalChargeAmount: number

  totalPaidAmount: number

  totalDueAmount: number

  totalPayments: number

  averagePayment: number
}

/* =========================
 * Family Ledger
 * ========================= */

export interface FamilyPaymentLedger {
  familyId: string
  familyNo: string
  headName: string

  phone: string
  address: string

  summary: FamilyPaymentLedgerSummary

  ledger: FamilyPaymentLedgerItem[]
}

export interface FamilyPaymentLedgerSummary {
  totalCharge: number
  totalPaid: number
  totalDue: number
}

export interface FamilyPaymentLedgerItem {
  monthlyChargeId: string

  year: number
  month: number

  chargeAmount: number

  paidAmount: number

  dueAmount: number

  status: PaymentStatus

  payments: FamilyLedgerPayment[]
}

export interface FamilyLedgerPayment {
  id: string

  amount: number

  method: PaymentMethod

  reference: string | null
  note: string | null

  paidAt: string | Date
}

/* =========================
 * Query Params & DTOs
 * ========================= */

export interface PaymentQueryParams {
  page?: number
  limit?: number

  search?: string
  familyId?: string

  year?: number
  month?: number

  method?: PaymentMethod
  status?: string

  fromDate?: string
  toDate?: string
}

export interface PaymentSummaryQueryParams {
  year?: number
  month?: number

  fromDate?: string
  toDate?: string
}

export interface FamilyLedgerQueryParams {
  year?: number
  month?: number
}

export interface CreatePaymentDto {
  familyId: string
  monthlyChargeId: string

  amount: number

  method: PaymentMethod

  reference?: string
  note?: string

  paidAt?: string
}

export interface UpdatePaymentDto {
  amount?: number

  method?: PaymentMethod

  reference?: string
  note?: string

  paidAt?: string
}