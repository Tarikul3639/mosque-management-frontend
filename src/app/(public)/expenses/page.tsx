import type { Metadata } from "next"

import { SITE_CONFIG } from "@/config/metadata"

import { ExpensePage } from "@/features/public/expense/ExpensePage"
import type { ExpenseCategory } from "@/types/expense"

interface ExpensesPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    search?: string
    category?: ExpenseCategory
  }>
}

export const metadata: Metadata = {
  title: "ব্যয়ের তালিকা",
  description: "মসজিদের সকল ব্যয়ের তথ্য, খাত, পরিমাণ ও ব্যয়ের তারিখ দেখুন।",
  keywords: [
    ...SITE_CONFIG.keywords,
    "Expenses",
    "Mosque Expenses",
    "Expense List",
    "ব্যয়ের তালিকা",
    "মসজিদের ব্যয়",
  ],
  alternates: {
    canonical: "/expenses",
  },
}

export default async function Page({ searchParams }: ExpensesPageProps) {
  const params = await searchParams

  return (
    <ExpensePage
      page={Number(params.page) || 1}
      limit={Number(params.limit) || 5}
      search={params.search?.trim() || ""}
      category={params.category}
    />
  )
}
