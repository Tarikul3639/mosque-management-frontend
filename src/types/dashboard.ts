type Trend = "increase" | "decrease" | "neutral"

export interface DashboardOverview {
  donations: {
    total: number
    growth: number
    trend: Trend
  }
  expenses: {
    total: number
    growth: number
    trend: Trend
  }
  balance: {
    total: number
    growth: number
    trend: Trend
  }
  families: {
    total: number
    growth: number
    trend: Trend
  }
}

export interface FinancialSummary {
  totalCollection: number
  totalExpense: number
  balance: number
  collectionPercentage: number
  expensePercentage: number
  balancePercentage: number
}

export interface MonthlyChartItem {
  month: string
  collection: number
  donation: number
  expense: number
}

export interface ExpenseChartItem {
  category: string
  amount: number
}

export interface RecentDonation {
  id: string
  donorName: string
  amount: number
  receiptNo: string
  paymentMethod: string
  donatedAt: string
}

export interface RecentExpense {
  id: string
  title: string
  category: string
  amount: number
  expenseDate: string
}

export interface DashboardQuery {
  from?: string
  to?: string
}
