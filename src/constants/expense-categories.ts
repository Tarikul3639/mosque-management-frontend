import { ExpenseCategory } from "@/types/expense"

export const EXPENSE_CATEGORY_OPTIONS: {
  value: ExpenseCategory
  label: string
}[] = [
  {
    value: ExpenseCategory.IMAM_SALARY,
    label: "Imam Salary",
  },
  {
    value: ExpenseCategory.MUAZZIN_SALARY,
    label: "Muazzin Salary",
  },
  {
    value: ExpenseCategory.ELECTRICITY,
    label: "Electricity",
  },
  {
    value: ExpenseCategory.WATER,
    label: "Water",
  },
  {
    value: ExpenseCategory.INTERNET,
    label: "Internet",
  },
  {
    value: ExpenseCategory.GAS,
    label: "Gas",
  },
  {
    value: ExpenseCategory.MAINTENANCE,
    label: "Maintenance",
  },
  {
    value: ExpenseCategory.CLEANING,
    label: "Cleaning",
  },
  {
    value: ExpenseCategory.DEVELOPMENT,
    label: "Development",
  },
  {
    value: ExpenseCategory.OFFICE,
    label: "Office",
  },
  {
    value: ExpenseCategory.EVENT,
    label: "Event",
  },
  {
    value: ExpenseCategory.OTHER,
    label: "Other",
  },
]

export const EXPENSE_CATEGORY_OPTIONS_WITH_ALL = [
  {
    value: "ALL",
    label: "All Categories",
  },
  ...EXPENSE_CATEGORY_OPTIONS,
]
