import { Suspense } from "react"

import { GalleryBanner } from "./components/GalleryBanner"
import { GalleryCardSkeleton } from "./components/GalleryCardSkeleton"
import { GalleriesContent } from "./components/GalleriesContent"
import { GalleryToolbar } from "./components/GalleryToolbar"

interface GalleryPageProps {
  page: number
  limit: number
  search?: string
}

export function GalleryPage({ page, limit, search }: GalleryPageProps) {
  return (
    <main>
      <GalleryBanner />

      <GalleryToolbar currentSearch={search} />

      <Suspense
        key={`${page}-${limit}-${search}`}
        fallback={<GalleryCardSkeleton count={limit} />}
      >
        <GalleriesContent page={page} limit={limit} search={search} />
      </Suspense>
    </main>
  )
}
