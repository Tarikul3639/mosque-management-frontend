import { baseApi } from "./base.api"

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

interface DashboardQuery {
  from?: string
  to?: string
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardOverview: builder.query<
      DashboardOverview,
      Partial<DashboardQuery>
    >({
      query: (params = {}) => ({
        url: "/dashboard/overview",
        params,
      }),
      providesTags: ["Dashboard"],
    }),

    getFinancialSummary: builder.query<
      FinancialSummary,
      Partial<DashboardQuery>
    >({
      query: (params = {}) => ({
        url: "/dashboard/financial-summary",
        params,
      }),
      providesTags: ["Dashboard"],
    }),

    getMonthlyChart: builder.query<MonthlyChartItem[], Partial<DashboardQuery>>(
      {
        query: (params = {}) => ({
          url: "/dashboard/monthly-chart",
          params,
        }),
        providesTags: ["Dashboard"],
      }
    ),

    getExpenseChart: builder.query<ExpenseChartItem[], Partial<DashboardQuery>>(
      {
        query: (params = {}) => ({
          url: "/dashboard/expense-chart",
          params,
        }),
        providesTags: ["Dashboard"],
      }
    ),

    getRecentDonations: builder.query<RecentDonation[], void>({
      query: () => "/dashboard/recent-donations",
      providesTags: ["Dashboard"],
    }),

    getRecentExpenses: builder.query<RecentExpense[], void>({
      query: () => "/dashboard/recent-expenses",
      providesTags: ["Dashboard"],
    }),
  }),
})

export const {
  useGetDashboardOverviewQuery,
  useGetFinancialSummaryQuery,
  useGetMonthlyChartQuery,
  useGetExpenseChartQuery,
  useGetRecentDonationsQuery,
  useGetRecentExpensesQuery,
} = dashboardApi
