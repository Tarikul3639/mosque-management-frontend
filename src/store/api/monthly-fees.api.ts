// src/store/api/monthly-fees.api.ts

import { baseApi } from "./base.api"

import type {
    CurrentFamilyFee,
    FamilyFeeHistory,
    CreateFamilyFeeDto,
    UpdateFamilyFeeDto,
} from "@/types/monthly-fee"

export const monthlyFeeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ==========================
        // Current Fee
        // ==========================

        getCurrentFamilyFee: builder.query<CurrentFamilyFee, { familyId: string }>({
            query: ({ familyId }) => `/families/${familyId}/current-fee`,

            providesTags: (_, __, { familyId }) => [
                {
                    type: "FamilyFee",
                    id: familyId,
                },
            ],
        }),

        // ==========================
        // Fee History
        // ==========================

        getFamilyFeeHistory: builder.query<
            FamilyFeeHistory[],
            { familyId: string }
        >({
            query: ({ familyId }) => `/families/${familyId}/fee-history`,

            providesTags: (_, __, { familyId }) => [
                {
                    type: "FamilyFee",
                    id: familyId,
                },
            ],
        }),

        // ==========================
        // Create Fee
        // ==========================

        createFamilyFee: builder.mutation<
            CurrentFamilyFee,
            {
                familyId: string
                data: CreateFamilyFeeDto
            }
        >({
            query: ({ familyId, data }) => ({
                url: `/families/${familyId}/fees`,
                method: "POST",
                body: data,
            }),

            invalidatesTags: (_, __, { familyId }) => [
                {
                    type: "FamilyFee",
                    id: familyId,
                },
            ],
        }),

        // ==========================
        // Update Fee
        // ==========================

        updateFamilyFee: builder.mutation<
            CurrentFamilyFee,
            {
                feeId: string
                familyId: string
                data: UpdateFamilyFeeDto
            }
        >({
            query: ({ feeId, data }) => ({
                url: `/family-fees/${feeId}`,
                method: "PATCH",
                body: data,
            }),

            invalidatesTags: (_, __, { familyId }) => [
                {
                    type: "FamilyFee",
                    id: familyId,
                },
            ],
        }),
    }),
})

export const {
    useGetCurrentFamilyFeeQuery,
    useGetFamilyFeeHistoryQuery,
    useCreateFamilyFeeMutation,
    useUpdateFamilyFeeMutation,
} = monthlyFeeApi
