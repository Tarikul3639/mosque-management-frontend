import { baseApi } from "./base.api"

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body: { email: string; password: string }) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
        }),

        forgotPassword: builder.mutation({
            query: (body: { email: string }) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body,
            }),
        }),

        resetPassword: builder.mutation({
            query: (body: { token: string; newPassword: string;}) => ({
                url: "/auth/reset-password",
                method: "POST",
                body,
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
        }),

        me: builder.query({
            query: () => "/auth/me",
        }),
    }),
})

export const { useLoginMutation, useForgotPasswordMutation, useResetPasswordMutation, useLogoutMutation, useMeQuery } = authApi
