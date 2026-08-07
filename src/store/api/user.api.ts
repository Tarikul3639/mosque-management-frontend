import { baseApi } from "./base.api"

import type {
  User,
  UserListResponse,
  UserQuery,
  CreateUserDto,
  UpdateUserDto,
  UserSummary,
} from "@/types/user"

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserSummary: builder.query<UserSummary, void>({
      query: () => "/users/summary",
      providesTags: ["User"],
    }),

    getUsers: builder.query<UserListResponse, Partial<UserQuery>>({
      query: (params) => ({
        url: "/users",
        params,
      }),

      providesTags: ["User"],
    }),

    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,

      providesTags: (_, __, id) => [
        {
          type: "User",
          id,
        },
      ],
    }),

    createUser: builder.mutation<User, CreateUserDto>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),

      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<
      User,
      {
        id: string
        body: UpdateUserDto
      }
    >({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: (_, __, { id }) => [
        "User",
        {
          type: "User",
          id,
        },
      ],
    }),

    deleteUser: builder.mutation<
      {
        message: string
      },
      string
    >({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useGetUserSummaryQuery,

  useGetUsersQuery,
  useLazyGetUsersQuery,

  useGetUserQuery,
  useLazyGetUserQuery,

  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi
