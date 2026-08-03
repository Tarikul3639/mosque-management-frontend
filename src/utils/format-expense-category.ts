// src/utils/format-expense-category.ts

import { ExpenseCategory } from "@/types/expense"

export function formatExpenseCategory(category: ExpenseCategory) {
  return category
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
