// src/store/api/search.api.ts

import { baseApi } from "./base.api"
import type { SearchResult } from "@/types/search"

export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query<SearchResult[], string>({
      query: (searchQuery) => ({
        url: "/search",
        params: { q: searchQuery },
      }),
    }),
  }),
})

export const { useLazyGlobalSearchQuery } = searchApi
