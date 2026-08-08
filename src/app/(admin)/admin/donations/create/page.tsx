// src/app/(dashboard)/donations/create/page.tsx

import { CreateDonationPage } from "@/features/donations/create/CreateDonationPage"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Donation",
  description: "Register a new donation for the mosque.",
}

export default function Page() {
  return <CreateDonationPage />
}
