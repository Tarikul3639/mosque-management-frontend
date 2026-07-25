import {
  Bolt,
  Droplets,
  Hammer,
  Receipt,
  Wallet,
  Wrench,
  LucideIcon,
} from "lucide-react"

export interface ExpenseCategoryConfig {
  icon: LucideIcon
  bgClassName: string
  textClassName: string
}

export const EXPENSE_CATEGORY_CONFIG: Record<string, ExpenseCategoryConfig> = {
  ELECTRICITY: {
    icon: Bolt,
    bgClassName: "bg-yellow-100",
    textClassName: "text-yellow-600",
  },

  WATER: {
    icon: Droplets,
    bgClassName: "bg-sky-100",
    textClassName: "text-sky-600",
  },

  IMAM_SALARY: {
    icon: Wallet,
    bgClassName: "bg-emerald-100",
    textClassName: "text-emerald-600",
  },

  MUAZZIN_SALARY: {
    icon: Wallet,
    bgClassName: "bg-emerald-100",
    textClassName: "text-emerald-600",
  },

  MAINTENANCE: {
    icon: Wrench,
    bgClassName: "bg-orange-100",
    textClassName: "text-orange-600",
  },

  DEVELOPMENT: {
    icon: Hammer,
    bgClassName: "bg-violet-100",
    textClassName: "text-violet-600",
  },

  OTHER: {
    icon: Receipt,
    bgClassName: "bg-muted",
    textClassName: "text-muted-foreground",
  },
}

export function getExpenseCategoryConfig(
  category: string
): ExpenseCategoryConfig {
  return (
    EXPENSE_CATEGORY_CONFIG[category] ?? {
      icon: Receipt,
      bgClassName: "bg-muted",
      textClassName: "text-muted-foreground",
    }
  )
}
