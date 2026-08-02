// src/utils/format-payment-method.ts

import { PaymentMethod } from "@/types/payment"

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.CASH]: "Cash",
  [PaymentMethod.BKASH]: "bKash",
  [PaymentMethod.NAGAD]: "Nagad",
  [PaymentMethod.BANK_TRANSFER]: "Bank Transfer",
  [PaymentMethod.CARD]: "Card",
  [PaymentMethod.QR]: "QR Code",
  [PaymentMethod.OTHER]: "Other",
}

export function formatPaymentMethod(
  paymentMethod: PaymentMethod | null | undefined
): string {
  if (!paymentMethod) {
    return "-"
  }

  return PAYMENT_METHOD_LABELS[paymentMethod] ?? paymentMethod
}
