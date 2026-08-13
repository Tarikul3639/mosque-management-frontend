import { ExpenseCategory } from "@/types/expense"

export const EXPENSE_CATEGORY_OPTIONS: {
  value: ExpenseCategory
  label: string
}[] = [
  {
    value: ExpenseCategory.IMAM_SALARY,
    label: "ইমামের বেতন",
  },
  {
    value: ExpenseCategory.MUAZZIN_SALARY,
    label: "মুয়াজ্জিনের বেতন",
  },
  {
    value: ExpenseCategory.ELECTRICITY,
    label: "বিদ্যুৎ বিল",
  },
  {
    value: ExpenseCategory.WATER,
    label: "পানির বিল",
  },
  {
    value: ExpenseCategory.INTERNET,
    label: "ইন্টারনেট",
  },
  {
    value: ExpenseCategory.GAS,
    label: "গ্যাস বিল",
  },
  {
    value: ExpenseCategory.MAINTENANCE,
    label: "রক্ষণাবেক্ষণ",
  },
  {
    value: ExpenseCategory.CLEANING,
    label: "পরিষ্কার-পরিচ্ছন্নতা",
  },
  {
    value: ExpenseCategory.DEVELOPMENT,
    label: "উন্নয়ন",
  },
  {
    value: ExpenseCategory.OFFICE,
    label: "অফিস ব্যয়",
  },
  {
    value: ExpenseCategory.EVENT,
    label: "অনুষ্ঠান",
  },
  {
    value: ExpenseCategory.OTHER,
    label: "অন্যান্য",
  },
]

export const getExpenseCategoryLabel = (category: ExpenseCategory): string => {
  const option = EXPENSE_CATEGORY_OPTIONS.find((opt) => opt.value === category)
  return option ? option.label : "অজানা"
}
