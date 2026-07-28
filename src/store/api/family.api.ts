import { baseApi } from "./base.api";

export interface FileResource {
    id: string;
    url: string;
}

export interface FamilyDetails {
    id: string;
    familyNo: string;
    headName: string;
    phone: string | null;
    address: string | null;
    avatar: FileResource | null;
    isActive: boolean;
    currentFee: {
        monthlyFee: number;
    } | null;
    paymentSummary: {
        totalPaid: number;
        totalDue: number;
        lastPaymentAt: string | null;
    };
    createdAt: string;
    updatedAt: string;
}

export interface Family {
    id: string;
    familyNo: string;
    headName: string;
    phone: string;
    address: string;
    avatar: FileResource | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface FamilyStats {
    totalFamilies: number;
    activeFamilies: number;
    inactiveFamilies: number;
    newFamiliesThisMonth: number;
}

export interface FamilyListResponse {
    data: Family[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface FamilyQuery {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
    sortBy?: "familyNo" | "headName" | "createdAt" | "updatedAt";
    sortOrder?: "asc" | "desc";
}

export interface CreateFamilyPayload {
    familyNo?: string;
    headName: string;
    phone: string;
    address?: string;
    avatarId?: string;
    isActive?: boolean;
}

export interface FamilyFeeHistoryResponse {
    id: string;
    familyId: string;
    monthlyFee: number;
    startDate: string;
    endDate: string;
    createdAt: string;
}

export interface UpdateFamilyPayload extends Partial<CreateFamilyPayload> {}

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
        getFamilies: builder.query<
            FamilyListResponse,
            FamilyQuery | void
        >({
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
            providesTags: (_result, _error, id) => [
                { type: "Family", id },
            ],
        }),

        // =========================
        // Create
        // =========================
        createFamily: builder.mutation<
            Family,
            CreateFamilyPayload
        >({
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
                id: string;
                body: UpdateFamilyPayload;
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
        deleteFamily: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/families/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Family"],
        }),

        // =========================
        // Activate
        // =========================
        activateFamily: builder.mutation<
            { message: string },
            string
        >({
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
            { familyId: string; }
        >({
            query: ({ familyId }) => ({
                url: `/families/${familyId}/fee-history`,
            }),
            providesTags: (_result, _error, { familyId }) => [
                { type: "FamilyFee", id: familyId },
            ],
        }),
    }),
});

export const {
    useGetFamilyStatsQuery,
    useGetFamiliesQuery,
    useGetFamilyDetailsQuery,
    useCreateFamilyMutation,
    useUpdateFamilyMutation,
    useDeleteFamilyMutation,
    useActivateFamilyMutation,
    useGetFamilyFeeHistoryQuery,
} = familyApi;