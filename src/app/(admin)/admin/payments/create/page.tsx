// src/app/(admin)/payments/create/page.tsx

import type { Metadata } from "next"

import { CreatePaymentPage } from "@/features/payments/create/CreatePaymentPage"

export const metadata: Metadata = {
  title: "Create Payment",
  description: "Record a new family payment.",
}

export default function Page() {
  return <CreatePaymentPage />
}
