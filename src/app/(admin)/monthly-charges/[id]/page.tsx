// src/app/(admin)/monthly-charges/[id]/page.tsx

import type { Metadata } from "next"

import { MonthlyChargeDetailsPage } from "@/features/monthly-charges/details/MonthlyChargeDetailsPage"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: "Monthly Charge Details",
  description: "View monthly charge details.",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <MonthlyChargeDetailsPage id={id} />
}
