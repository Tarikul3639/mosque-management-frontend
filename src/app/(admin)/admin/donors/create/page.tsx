// src/app/(dashboard)/donors/create/page.tsx

import { CreateDonorPage } from "@/features/admin/donors/create/CreateDonorPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Donor",
  description: "Add a new donor to the mosque management system.",
}

export default function Page() {
  return <CreateDonorPage />
}
