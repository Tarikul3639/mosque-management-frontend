import { Suspense } from "react"

import { FamilyContent } from "./components/FamiliesContent"
import { FamilyCardSkeletonGrid } from "./components/FamilyCardSkeleton"
import { FamilyBanner } from "./components/FamilyBanner"
import { FamilyToolbar } from "./components/FamilyToolbar"

interface FamilyPageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    search?: string
  }>
}

export async function FamilyPage({ searchParams }: FamilyPageProps) {
  const params = await searchParams

  const page = Number(params.page) || 1
  const limit = Number(params.limit) || 10
  const search = params.search?.trim() || ""

  return (
    <main>
      <FamilyBanner />

      <FamilyToolbar currentSearch={search} currentLimit={limit} />

      <Suspense
        key={`${page}-${limit}-${search}`}
        fallback={<FamilyCardSkeletonGrid />}
      >
        <FamilyContent page={page} limit={limit} search={search} />
      </Suspense>
    </main>
  )
}
