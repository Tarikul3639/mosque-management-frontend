import {
  fetchBaseQuery,
  BaseQueryFn,
  createApi,
} from "@reduxjs/toolkit/query/react"
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query"

const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.NEXT_PUBLIC_API_URL,
  baseUrl: "/api/v1",
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json")
    return headers
  },
})

const baseQueryWithInterceptor: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  // TODO: Future:
  // - Handle 401
  // - Refresh token
  // - Logout
  // - Global error handling

  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: [
    "User",
    "Dashboard",

    "Family",
    "FamilyFee",
    "MonthlyCharge",

    "Committee",
    "Donation",
    "Expense",
    "Donor",
    "Gallery",
    "Project",

    "Payment",
    "PrayerTime",
  ],
  endpoints: () => ({}),
})
