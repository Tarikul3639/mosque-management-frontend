export enum PaymentMethod {
  CASH = "CASH",
  BKASH = "BKASH",
  NAGAD = "NAGAD",
  BANK_TRANSFER = "BANK_TRANSFER",
  CARD = "CARD",
  QR = "QR",
  OTHER = "OTHER",
}

export enum PaymentStatus {
  DUE = "DUE",
  PAID = "PAID",
  PARTIAL = "PARTIAL",
}

export interface FamilyLedgerQuery {
  familyId: string
  year?: number
  month?: number
}

export interface FamilyLedgerResponse {
  familyId: string
  familyNo: string
  headName: string
  phone: string
  address: string

  summary: {
    totalCharge: number
    totalPaid: number
    totalDue: number
  }

  ledger: FamilyLedgerItem[]
}

export interface FamilyLedgerItem {
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
  method: string
  reference: string | null
  note: string | null
  paidAt: string
}
