// src/store/api/expense.api.ts

import { baseApi } from "./base.api"

import type {
    Expense,
    ExpenseSummary,
    ExpenseQuery,
    CreateExpenseDto,
    UpdateExpenseDto,
    PaginatedResponse,
} from "@/types/expense"

export const expenseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ==================================================
        // List Expenses
        // ==================================================

        getExpenses: builder.query<
            PaginatedResponse<Expense>,
            Partial<ExpenseQuery>
        >({
            query: (params) => ({
                url: "/expenses",
                params,
            }),

            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({ id }) => ({
                            type: "Expense" as const,
                            id,
                        })),
                        {
                            type: "Expense",
                            id: "LIST",
                        },
                        {
                            type: "Expense",
                            id: "SUMMARY",
                        },
                    ]
                    : [
                        {
                            type: "Expense",
                            id: "LIST",
                        },
                    ],
        }),

        // ==================================================
        // Summary
        // ==================================================

        getExpenseSummary: builder.query<ExpenseSummary, void>({
            query: () => "/expenses/summary",

            providesTags: [
                {
                    type: "Expense",
                    id: "SUMMARY",
                },
            ],
        }),

        // ==================================================
        // Details
        // ==================================================

        getExpense: builder.query<Expense, string>({
            query: (id) => `/expenses/${id}`,

            providesTags: (_, __, id) => [
                {
                    type: "Expense",
                    id,
                },
            ],
        }),

        // ==================================================
        // Create
        // ==================================================

        createExpense: builder.mutation<Expense, CreateExpenseDto>({
            query: (body) => ({
                url: "/expenses",
                method: "POST",
                body,
            }),

            invalidatesTags: [
                {
                    type: "Expense",
                    id: "LIST",
                },
                {
                    type: "Expense",
                    id: "SUMMARY",
                },
            ],
        }),

        // ==================================================
        // Update
        // ==================================================

        updateExpense: builder.mutation<
            Expense,
            {
                id: string
                data: UpdateExpenseDto
            }
        >({
            query: ({ id, data }) => ({
                url: `/expenses/${id}`,
                method: "PATCH",
                body: data,
            }),

            invalidatesTags: (_, __, { id }) => [
                {
                    type: "Expense",
                    id,
                },
                {
                    type: "Expense",
                    id: "LIST",
                },
                {
                    type: "Expense",
                    id: "SUMMARY",
                },
            ],
        }),

        // ==================================================
        // Delete
        // ==================================================

        deleteExpense: builder.mutation<
            {
                message: string
            },
            string
        >({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: [
                {
                    type: "Expense",
                    id: "LIST",
                },
                {
                    type: "Expense",
                    id: "SUMMARY",
                },
            ],
        }),
    }),
})

export const {
    useGetExpensesQuery,
    useGetExpenseSummaryQuery,
    useGetExpenseQuery,

    useCreateExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation,
} = expenseApi
