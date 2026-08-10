// src/app/(admin)/donations/page.tsx

import { Metadata } from "next"

import { DonationsPage } from "@/features/admin/donations/list/DonationsPage"

export const metadata: Metadata = {
  title: "Donations",
  description: "Manage and track mosque donations.",
}

export default function Page() {
  return <DonationsPage />
}
