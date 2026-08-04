import { baseApi } from "./base.api"

import type {
  MonthlyCharge,
  MonthlyChargeListResponse,
  MonthlyChargeQuery,
  UpdateMonthlyChargeDto,
  GenerateMonthlyChargeDto,
  GenerateMonthlyChargeResponse,
} from "@/types/monthly-charge"

export const monthlyChargeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==========================
    // List
    // ==========================

    getMonthlyCharges: builder.query<
      MonthlyChargeListResponse,
      MonthlyChargeQuery
    >({
      query: (params) => ({
        url: "/monthly-charges",
        params,
      }),

      providesTags: ["MonthlyCharge"],
    }),

    // ==========================
    // Details
    // ==========================

    getMonthlyCharge: builder.query<MonthlyCharge, string>({
      query: (id) => `/monthly-charges/${id}`,

      providesTags: (_, __, id) => [
        {
          type: "MonthlyCharge",
          id,
        },
      ],
    }),

    // ==========================
    // Update
    // ==========================

    updateMonthlyCharge: builder.mutation<
      MonthlyCharge,
      {
        id: string
        data: UpdateMonthlyChargeDto
      }
    >({
      query: ({ id, data }) => ({
        url: `/monthly-charges/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (_, __, { id }) => [
        {
          type: "MonthlyCharge",
          id,
        },
        "MonthlyCharge",
      ],
    }),

    // ==========================
    // Delete
    // ==========================

    deleteMonthlyCharge: builder.mutation<void, string>({
      query: (id) => ({
        url: `/monthly-charges/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["MonthlyCharge"],
    }),

    // ==========================
    // Generate
    // ==========================

    generateMonthlyCharges: builder.mutation<
      GenerateMonthlyChargeResponse,
      GenerateMonthlyChargeDto
    >({
      query: (body) => ({
        url: "/monthly-charges/generate",
        method: "POST",
        body,
      }),

      invalidatesTags: ["MonthlyCharge", "Dashboard"],
    }),
  }),
})

export const {
  useGetMonthlyChargesQuery,
  useGetMonthlyChargeQuery,

  useUpdateMonthlyChargeMutation,
  useDeleteMonthlyChargeMutation,

  useGenerateMonthlyChargesMutation,
} = monthlyChargeApi
