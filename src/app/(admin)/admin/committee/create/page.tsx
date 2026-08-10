import type { Metadata } from "next"

import { CreateCommitteePage } from "@/features/admin/committee/create/CreateCommitteePage"

export const metadata: Metadata = {
  title: "Create Committee Member",
  description: "Create a new committee member.",
}

export default function Page() {
  return <CreateCommitteePage />
}
