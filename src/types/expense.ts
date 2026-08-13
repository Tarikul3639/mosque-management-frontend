// src/types/expense.ts

import { PaginationMeta } from "./common"

export enum ExpenseCategory {
  IMAM_SALARY = "IMAM_SALARY",
  MUAZZIN_SALARY = "MUAZZIN_SALARY",
  ELECTRICITY = "ELECTRICITY",
  WATER = "WATER",
  INTERNET = "INTERNET",
  GAS = "GAS",
  MAINTENANCE = "MAINTENANCE",
  CLEANING = "CLEANING",
  DEVELOPMENT = "DEVELOPMENT",
  OFFICE = "OFFICE",
  EVENT = "EVENT",
  OTHER = "OTHER",
}

export interface ExpenseUser {
  id: string
  name: string
}

export interface Expense {
  id: string
  category: ExpenseCategory
  title: string
  amount: number
  note: string | null
  expenseDate: string
  createdBy: ExpenseUser
  updatedBy: ExpenseUser | null
  createdAt: string
  updatedAt: string
}

export interface ExpenseListResponse {
  data: Expense[]
  meta: PaginationMeta
}

export interface ExpenseSummary {
  totalExpenses: number
  totalAmount: number
  currentMonthAmount: number
  currentYearAmount: number
}

export interface ExpenseQuery {
  page?: number
  limit?: number
  search?: string
  category?: ExpenseCategory
}

export interface CreateExpenseDto {
  category: ExpenseCategory
  title: string
  amount: number
  note?: string
  expenseDate: string
}

export interface UpdateExpenseDto {
  category?: ExpenseCategory
  title?: string
  amount?: number
  note?: string
  expenseDate?: string
}
