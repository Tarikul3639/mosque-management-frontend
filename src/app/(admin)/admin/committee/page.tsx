import { CommitteePage } from "@/features/admin/committee/list/CommitteePage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Committee Members",
  description: "Manage mosque committee members and their responsibilities.",
}

export default function Page() {
  return <CommitteePage />
}
