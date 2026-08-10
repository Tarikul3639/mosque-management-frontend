import type { Metadata } from "next"

import { DonorsPage } from "@/features/admin/donors/list/DonorsPage"

export const metadata: Metadata = {
  title: "Donors",
  description:
    "Manage mosque donors, view donor information, and track donations.",
}

export default function Page() {
  return <DonorsPage />
}
