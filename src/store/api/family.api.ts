import { baseApi } from "./base.api";

export interface FileResource {
    id: string;
    url: string;
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
    familyNo: string;
    headName: string;
    phone: string;
    address: string;
    avatarId?: string;
    isActive?: boolean;
}

export type UpdateFamilyPayload = Partial<CreateFamilyPayload>;

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
        getFamily: builder.query<Family, string>({
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
        // Delete
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
    }),
});

export const {
    useGetFamilyStatsQuery,
    useGetFamiliesQuery,
    useGetFamilyQuery,
    useCreateFamilyMutation,
    useUpdateFamilyMutation,
    useDeleteFamilyMutation,
} = familyApi;