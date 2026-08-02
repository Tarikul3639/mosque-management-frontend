// src/app/(dashboard)/donations/[id]/page.tsx

import type { Metadata } from "next"

import { DonationDetailsPage } from "@/features/donations/details/DonationDetailsPage"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: "Donation Details",
  description: "View and manage donation details.",
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <DonationDetailsPage donationId={id} />
}
