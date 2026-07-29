import { baseApi } from "./base.api"

import type {
    Family,
    FamilyDetails,
    FamilyFeeHistoryResponse,
    FamilyListResponse,
    FamilyQuery,
    FamilyStats,
    CreateFamilyPayload,
    UpdateFamilyPayload,
} from "@/types/family"

export const familyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // =========================
        // Stats
        // =========================
        getFamilyStats: builder.query<FamilyStats, void>({
            query: () => ({
                url: "/families/stats",
            }),
            providesTags: ["Family"],
        }),

        // =========================
        // List
        // =========================
        getFamilies: builder.query<FamilyListResponse, FamilyQuery | void>({
            query: (params) => ({
                url: "/families",
                params: params ?? undefined,
            }),
            providesTags: ["Family"],
        }),

        // =========================
        // Details
        // =========================
        getFamilyDetails: builder.query<FamilyDetails, string>({
            query: (id) => ({
                url: `/families/${id}`,
            }),
            providesTags: (_result, _error, id) => [{ type: "Family", id }],
        }),

        // =========================
        // Create
        // =========================
        createFamily: builder.mutation<Family, CreateFamilyPayload>({
            query: (body) => ({
                url: "/families",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Family"],
        }),

        // =========================
        // Update
        // =========================
        updateFamily: builder.mutation<
            Family,
            {
                id: string
                body: UpdateFamilyPayload
            }
        >({
            query: ({ id, body }) => ({
                url: `/families/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                "Family",
                { type: "Family", id },
            ],
        }),

        // =========================
        // Delete/Inactivate
        // =========================
        deleteFamily: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/families/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Family"],
        }),

        // =========================
        // Activate
        // =========================
        activateFamily: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/families/${id}/activate`,
                method: "POST",
            }),
            invalidatesTags: (_result, _error, id) => [
                "Family",
                { type: "Family", id },
            ],
        }),

        // =========================
        // Family Fee History
        // =========================
        getFamilyFeeHistory: builder.query<
            FamilyFeeHistoryResponse[],
            { familyId: string }
        >({
            query: ({ familyId }) => ({
                url: `/families/${familyId}/fee-history`,
            }),
            providesTags: (_result, _error, { familyId }) => [
                { type: "FamilyFee", id: familyId },
            ],
        }),
    }),
})

export const {
    useGetFamilyStatsQuery,
    useGetFamiliesQuery,
    useGetFamilyDetailsQuery,
    useCreateFamilyMutation,
    useUpdateFamilyMutation,
    useDeleteFamilyMutation,
    useActivateFamilyMutation,
    useGetFamilyFeeHistoryQuery,
} = familyApi
