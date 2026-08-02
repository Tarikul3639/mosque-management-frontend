// src/constants/payment-methods.ts

import { PaymentMethod } from "@/types/payment"

export const PAYMENT_METHOD_OPTIONS = [
  {
    value: PaymentMethod.CASH,
    label: "Cash",
  },
  {
    value: PaymentMethod.BKASH,
    label: "bKash",
  },
  {
    value: PaymentMethod.NAGAD,
    label: "Nagad",
  },
  {
    value: PaymentMethod.BANK_TRANSFER,
    label: "Bank Transfer",
  },
  {
    value: PaymentMethod.CARD,
    label: "Card",
  },
  {
    value: PaymentMethod.QR,
    label: "QR",
  },
  {
    value: PaymentMethod.OTHER,
    label: "Other",
  },
] as const

export const PAYMENT_METHOD_FILTER_OPTIONS = [
  {
    value: "ALL",
    label: "All Methods",
  },
  ...PAYMENT_METHOD_OPTIONS,
] as const
