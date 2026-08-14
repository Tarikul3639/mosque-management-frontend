import { Suspense } from "react"

import { GalleryContent } from "./components/GalleryContent"
import { GalleryDetailsHeader } from "./components/GalleryDetailsHeader"
import { GalleryDetailsSkeleton } from "./components/GalleryDetailsSkeleton"

interface GalleryDetailsPageProps {
  galleryId: string
}

export function GalleryDetailsPage({ galleryId }: GalleryDetailsPageProps) {
  return (
    <>
      <GalleryDetailsHeader />

      <Suspense fallback={<GalleryDetailsSkeleton />}>
        <GalleryContent galleryId={galleryId} />
      </Suspense>
    </>
  )
}
