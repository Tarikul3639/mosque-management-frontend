// src/constants/payment-status.ts

import { PaymentStatus } from "@/types/payment"

export const PAYMENT_STATUS_OPTIONS = [
  {
    label: "Due",
    value: PaymentStatus.DUE,
  },
  {
    label: "Paid",
    value: PaymentStatus.PAID,
  },
  {
    label: "Partial",
    value: PaymentStatus.PARTIAL,
  },
] as const

export const PAYMENT_STATUS_OPTIONS_WITH_ALL = [
  {
    label: "All",
    value: "ALL",
  },
  ...PAYMENT_STATUS_OPTIONS,
] as const
