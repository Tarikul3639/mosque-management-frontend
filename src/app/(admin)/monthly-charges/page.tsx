// src/app/(admin)/monthly-charges/page.tsx

import type { Metadata } from "next"

import { MonthlyChargesPage } from "@/features/monthly-charges/list/MonthlyChargesPage"

export const metadata: Metadata = {
  title: "Monthly Charges",
  description:
    "Manage family monthly charges, due payments, payment status, and monthly billing records.",
}

export default function Page() {
  return <MonthlyChargesPage />
}
