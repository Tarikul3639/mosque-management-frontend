import type { Metadata } from "next"

import { PaymentsPage } from "@/features/payments/list/PaymentsPage"

export const metadata: Metadata = {
  title: "Payments",
  description: "Manage and track all payment records.",
}

export default function Page() {
  return <PaymentsPage />
}
