// src/app/(admin)/expenses/[id]/page.tsx

import { ExpenseDetailsPage } from "@/features/admin/expenses/details/ExpenseDetailsPage"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Expense Details",
  description: "View detailed information about a specific expense.",
}

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <ExpenseDetailsPage id={id} />
}
