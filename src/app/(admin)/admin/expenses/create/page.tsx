import { CreateExpensePage } from "@/features/admin/expenses/create/CreateExpensePage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Expense",
  description: "Record a new mosque expense.",
}

export default function Page() {
  return <CreateExpensePage />
}
