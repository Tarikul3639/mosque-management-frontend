import { UserPage } from "@/features/admin/users/list/UserPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Users",
  description:
    "Manage administrators and user accounts for the mosque management system.",
}

export default function Page() {
  return <UserPage />
}
