import { baseApi } from "./base.api"

import type {
  CommitteeMember,
  CommitteeListResponse,
  CommitteeQuery,
  CreateCommitteeDto,
  UpdateCommitteeDto,
} from "@/types/committee"

export const committeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ===============================
    // List
    // ===============================

    getCommitteeMembers: builder.query<CommitteeListResponse, CommitteeQuery>({
      query: (params) => ({
        url: "/committee",
        params,
      }),

      providesTags: ["Committee"],
    }),

    // ===============================
    // Details
    // ===============================

    getCommitteeMember: builder.query<CommitteeMember, string>({
      query: (id) => `/committee/${id}`,

      providesTags: (_, __, id) => [
        {
          type: "Committee",
          id,
        },
      ],
    }),

    // ===============================
    // Create
    // ===============================

    createCommitteeMember: builder.mutation<
      CommitteeMember,
      CreateCommitteeDto
    >({
      query: (body) => ({
        url: "/committee",
        method: "POST",
        body,
      }),

      invalidatesTags: ["Committee"],
    }),

    // ===============================
    // Update
    // ===============================

    updateCommitteeMember: builder.mutation<
      CommitteeMember,
      {
        id: string
        body: UpdateCommitteeDto
      }
    >({
      query: ({ id, body }) => ({
        url: `/committee/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (_, __, { id }) => [
        "Committee",
        {
          type: "Committee",
          id,
        },
      ],
    }),

    // ===============================
    // Delete
    // ===============================

    deleteCommitteeMember: builder.mutation<void, string>({
      query: (id) => ({
        url: `/committee/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Committee"],
    }),

    // ===============================
    // Activate
    // ===============================

    activateCommitteeMember: builder.mutation<void, string>({
      query: (id) => ({
        url: `/committee/${id}/activate`,
        method: "PATCH",
      }),

      invalidatesTags: (_, __, id) => [
        "Committee",
        {
          type: "Committee",
          id,
        },
      ],
    }),

    // ===============================
    // Deactivate
    // ===============================

    deactivateCommitteeMember: builder.mutation<void, string>({
      query: (id) => ({
        url: `/committee/${id}/deactivate`,
        method: "PATCH",
      }),

      invalidatesTags: (_, __, id) => [
        "Committee",
        {
          type: "Committee",
          id,
        },
      ],
    }),
  }),
})

export const {
  useGetCommitteeMembersQuery,
  useGetCommitteeMemberQuery,

  useCreateCommitteeMemberMutation,
  useUpdateCommitteeMemberMutation,

  useDeleteCommitteeMemberMutation,

  useActivateCommitteeMemberMutation,
  useDeactivateCommitteeMemberMutation,
} = committeeApi
