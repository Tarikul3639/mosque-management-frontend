// src/store/api/payment.api.ts

import { baseApi } from "./base.api"

import type {
  Payment,
  PaymentSummary,
  FamilyPaymentLedger,
  PaymentQueryParams,
  PaymentSummaryQueryParams,
  FamilyLedgerQueryParams,
  CreatePaymentDto,
  UpdatePaymentDto,
} from "@/types/payment"
import type { PaginatedResponse } from "@/types/common"

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===========================
    // List
    // ===========================

    getPayments: builder.query<
      PaginatedResponse<Payment>,
      Partial<PaymentQueryParams>
    >({
      query: (params) => ({
        url: "/payments",
        params,
      }),

      providesTags: ["Payment"],
    }),

    // ===========================
    // Summary
    // ===========================

    getPaymentSummary: builder.query<PaymentSummary, PaymentSummaryQueryParams>(
      {
        query: (params) => ({
          url: "/payments/summary",
          params,
        }),

        providesTags: ["Payment"],
      }
    ),

    // ===========================
    // Details
    // ===========================

    getPayment: builder.query<Payment, string>({
      query: (id) => `/payments/${id}`,

      providesTags: (_, __, id) => [
        {
          type: "Payment",
          id,
        },
      ],
    }),

    // ===========================
    // Receipt
    // ===========================

    getPaymentReceipt: builder.query<Blob, string>({
      query: (id) => ({
        url: `/payments/${id}/receipt`,
        responseHandler: (response) => response.blob(),
      }),

      providesTags: (_, __, id) => [
        {
          type: "Payment",
          id: `receipt-${id}`,
        },
      ],
    }),

    // ===========================
    // Family Ledger
    // ===========================

    getFamilyPaymentLedger: builder.query<
      FamilyPaymentLedger,
      {
        familyId: string
        params?: FamilyLedgerQueryParams
      }
    >({
      query: ({ familyId, params }) => ({
        url: `/payments/family/${familyId}/ledger`,
        params,
      }),

      providesTags: (_, __, arg) => [
        {
          type: "Payment",
          id: `ledger-${arg.familyId}`,
        },
      ],
    }),

    // ===========================
    // Create
    // ===========================

    createPayment: builder.mutation<Payment, CreatePaymentDto>({
      query: (data) => ({
        url: "/payments",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Payment", "MonthlyCharge"],
    }),

    // ===========================
    // Update
    // ===========================

    updatePayment: builder.mutation<
      Payment,
      {
        id: string
        data: UpdatePaymentDto
      }
    >({
      query: ({ id, data }) => ({
        url: `/payments/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: (_, __, { id }) => [
        "Payment",
        "MonthlyCharge",
        {
          type: "Payment",
          id,
        },
      ],
    }),

    // ===========================
    // Delete
    // ===========================

    deletePayment: builder.mutation<
      {
        message: string
      },
      string
    >({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Payment", "MonthlyCharge"],
    }),
  }),
})

export const {
  useGetPaymentsQuery,
  useGetPaymentSummaryQuery,

  useGetPaymentQuery,
  useLazyGetPaymentReceiptQuery,
  useGetFamilyPaymentLedgerQuery,

  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi
