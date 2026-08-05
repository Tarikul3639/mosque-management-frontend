"use client"

import { GalleryDetailsSkeleton } from "./components/GalleryDetailsSkeleton"
import { GalleryDetailsHeader } from "./components/GalleryDetailsHeader"
import { GalleryImagesCard } from "./components/GalleryImagesCard"
import { GalleryInformationCard } from "./components/GalleryInformationCard"

import { useGallery } from "./useGallery"

interface GalleryDetailsPageProps {
  id: string
}

export function GalleryDetailsPage({ id }: GalleryDetailsPageProps) {
  const { gallery, isLoading } = useGallery({
    id,
  })

  if (isLoading || !gallery) {
    return <GalleryDetailsSkeleton />
  }

  return (
    <div className="space-y-6 p-6">
      <GalleryDetailsHeader gallery={gallery} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <GalleryImagesCard images={gallery.images} />
        </div>

        <div className="space-y-6">
          <GalleryInformationCard gallery={gallery} />
        </div>
      </div>
    </div>
  )
}
