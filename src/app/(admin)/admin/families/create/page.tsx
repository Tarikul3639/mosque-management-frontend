import type { Metadata } from "next"
import { FamilyCreatePage } from "@/features/admin/families/create/FamilyCreatePage"

export const metadata: Metadata = {
  title: "Create Family",
  description:
    "Create a new family by adding their profile, contact information, and account status.",
}

export default function Page() {
  return <FamilyCreatePage />
}
