// src/app/(admin)/donations/[id]/edit/page.tsx

import { DonationEditPage } from "@/features/donations/edit/DonationEditPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Donation",
  description: "Update donation information and payment details.",
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <DonationEditPage id={id} />
}
