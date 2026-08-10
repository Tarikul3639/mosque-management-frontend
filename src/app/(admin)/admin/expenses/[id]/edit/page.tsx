// src/app/(admin)/expenses/[id]/edit/page.tsx

import { ExpenseEditPage } from "@/features/admin/expenses/edit/ExpenseEditPage"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Expense",
  description: "Edit an existing expense.",
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <ExpenseEditPage id={id} />
}
