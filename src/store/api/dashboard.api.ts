import { baseApi } from "./base.api"

import type {
  DashboardOverview,
  FinancialSummary,
  MonthlyChartItem,
  ExpenseChartItem,
  RecentDonation,
  RecentExpense,
  DashboardQuery,
} from "@/types/dashboard"

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
