import type { Metadata } from "next"
import { FamiliesPage } from "@/features/admin/families/list/FamiliesPage"

export const metadata: Metadata = {
  title: "Families | Dashboard",
  description: "Manage and view family records",
}

export default function Page() {
  return <FamiliesPage />
}