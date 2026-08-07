// src/store/api/search.api.ts

import { baseApi } from "./base.api"

export interface SearchResult {
    id: string
    type: "user" | "donor" | "family" | "committee" | "project"
    title: string
    subtitle?: string
    url: string
}

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