import { baseApi } from "./base.api"
import type {
  Donor,
  GetDonorsParams,
  GetDonorsResponse,
  UpdateDonorRequest,
  CreateDonorRequest,
} from "@/types/donor"

export const donorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // =========================
    // List
    // =========================
    getDonors: builder.query<GetDonorsResponse, GetDonorsParams>({
      query: (params) => ({
        url: "/donors",
        params: params ?? undefined,
      }),
      providesTags: ["Donor"],
    }),

    // =========================
    // Details
    // =========================
    getDonorDetails: builder.query<Donor, string>({
      query: (id) => ({
        url: `/donors/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: "Donor", id }],
    }),

    // =========================
    // Create
    // =========================
    createDonor: builder.mutation<Donor, CreateDonorRequest>({
      query: (body) => ({
        url: "/donors",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Donor"],
    }),

    // =========================
    // Update
    // =========================
    updateDonor: builder.mutation<
      Donor,
      { id: string; body: UpdateDonorRequest }
    >({
      query: ({ id, body }) => ({
        url: `/donors/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Donor", id }],
    }),

    // =========================
    // Delete
    // =========================
    deleteDonor: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/donors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Donor", id }],
    }),
  }),
})

export const {
  useGetDonorsQuery,
  useGetDonorDetailsQuery,
  useCreateDonorMutation,
  useUpdateDonorMutation,
  useDeleteDonorMutation,
} = donorApi
