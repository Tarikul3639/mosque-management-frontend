import type { ReactNode } from "react"

export const SEARCH_TYPES = [
  "USER",
  "FAMILY",
  "DONOR",
  "COMMITTEE",
  "PROJECT",
  "DONATION",
  "PAYMENT",
  "EXPENSE",
  "GALLERY",
  "PRAYER_TIME",
] as const

export type SearchType = (typeof SEARCH_TYPES)[number]

export interface SearchResult {
  id: string

  type: SearchType

  title: string
  subtitle?: string

  url: string

  icon?: ReactNode
}

export interface SearchQuery {
  q: string
}

export type SearchResponse = SearchResult[]
