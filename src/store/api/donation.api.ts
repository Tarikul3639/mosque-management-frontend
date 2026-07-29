// src/modules/donations/api/donation.api.ts

import { baseApi } from "./base.api"

import type {
    CreateDonationRequest,
    DeleteDonationResponse,
    DonationListResponse,
    DonationQuery,
    DonationReceiptResponse,
    DonationResponse,
    DonationSummaryQuery,
    DonationSummaryResponse,
    DonorDonationHistoryQuery,
    DonorDonationHistoryResponse,
    UpdateDonationRequest,
} from "@/types/donation"

export const donationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDonations: builder.query<DonationListResponse, DonationQuery>({
            query: (params) => ({
                url: "/donations",
                params,
            }),
            providesTags: ["Donation"],
        }),

        getDonation: builder.query<DonationResponse, string>({
            query: (id) => ({
                url: `/donations/${id}`,
            }),
            providesTags: (_result, _error, id) => [{ type: "Donation", id }],
        }),

        getDonationSummary: builder.query<
            DonationSummaryResponse,
            DonationSummaryQuery
        >({
            query: (params) => ({
                url: "/donations/summary",
                params,
            }),
            providesTags: ["Donation"],
        }),

        getDonorDonationHistory: builder.query<
            DonorDonationHistoryResponse,
            DonorDonationHistoryQuery
        >({
            query: (params) => ({
                url: "/donations/donor/history",
                params,
            }),
            providesTags: ["Donation"],
        }),

        getDonationReceipt: builder.query<DonationReceiptResponse, string>({
            query: (id) => ({
                url: `/donations/${id}/receipt`,
            }),
        }),

        createDonation: builder.mutation<DonationResponse, CreateDonationRequest>({
            query: (body) => ({
                url: "/donations",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Donation"],
        }),

        updateDonation: builder.mutation<
            DonationResponse,
            {
                id: string
                data: UpdateDonationRequest
            }
        >({
            query: ({ id, data }) => ({
                url: `/donations/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                "Donation",
                { type: "Donation", id },
            ],
        }),

        deleteDonation: builder.mutation<DeleteDonationResponse, string>({
            query: (id) => ({
                url: `/donations/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Donation"],
        }),
    }),
})

export const {
    useGetDonationsQuery,
    useGetDonationQuery,
    useGetDonationSummaryQuery,
    useGetDonorDonationHistoryQuery,
    useGetDonationReceiptQuery,
    useCreateDonationMutation,
    useUpdateDonationMutation,
    useDeleteDonationMutation,
} = donationApi
