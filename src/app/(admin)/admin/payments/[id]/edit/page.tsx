// src/app/(admin)/payments/[id]/edit/page.tsx

import type { Metadata } from "next"

import { PaymentEditPage } from "@/features/payments/edit/PaymentEditPage"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: "Edit Payment",
  description: "Update payment information.",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <PaymentEditPage id={id} />
}
