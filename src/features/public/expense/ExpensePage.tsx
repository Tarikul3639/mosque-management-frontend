import { Suspense } from "react"

import { ExpenseBanner } from "./components/ExpenseBanner"
import { ExpenseCardSkeletonGrid } from "./components/ExpenseCardSkeleton"
import { ExpensesContent } from "./components/ExpensesContent"
import { ExpenseToolbar } from "./components/ExpenseToolbar"
import type { ExpenseCategory } from "@/types/expense"

interface ExpensePageProps {
  page?: number
  limit?: number
  search?: string
  category?: ExpenseCategory
}

export function ExpensePage({
  page = 1,
  limit = 5,
  search,
  category,
}: ExpensePageProps) {
  return (
    <main>
      <ExpenseBanner />

      <ExpenseToolbar currentSearch={search} currentCategory={category} />

      <Suspense
        key={`${page}-${limit}-${search}-${category}`}
        fallback={<ExpenseCardSkeletonGrid count={limit} />}
      >
        <ExpensesContent
          page={page}
          limit={limit}
          search={search}
          category={category}
        />
      </Suspense>
    </main>
  )
}
