import type { Metadata } from "next"

import { UserCreatePage } from "@/features/users/create/CreateUserPage"

export const metadata: Metadata = {
  title: "Create User",
  description: "Create a new user account.",
}

export default function Page() {
  return <UserCreatePage />
}
