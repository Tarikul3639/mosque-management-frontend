import { api } from "@/lib/axios"

import type {
  Expense,
  ExpenseCategory,
  ExpenseListResponse,
} from "@/types/expense"

export interface ExpenseQueryParams {
  page?: number
  limit?: number
  search?: string
  category?: ExpenseCategory
}

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */

export async function getExpenses(
  params: ExpenseQueryParams = {}
): Promise<ExpenseListResponse> {
  const { data } = await api.get<ExpenseListResponse>("/expenses", {
    params,
  })

  return data
}

export async function getExpense(expenseId: string): Promise<Expense> {
  const { data } = await api.get<Expense>(`/expenses/${expenseId}`)

  return data
}
