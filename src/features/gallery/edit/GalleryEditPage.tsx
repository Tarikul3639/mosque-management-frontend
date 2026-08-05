"use client"

import { ImageUpload } from "@/components/common/image-upload"

import { GalleryForm } from "../shared/GalleryForm"
import { GalleryCreationTipsCard } from "../shared/GalleryCreationTipsCard"

import { GalleryDangerZone } from "./components/GalleryDangerZone"
import { GalleryEditHeader } from "./components/GalleryEditHeader"
import { GalleryEditSkeleton } from "./components/GalleryEditSkeleton"

import { useGalleryEdit } from "./useGalleryEdit"

interface GalleryEditPageProps {
  id: string
}

export function GalleryEditPage({ id }: GalleryEditPageProps) {
  const {
    gallery,

    form,

    images,

    handleSubmit,
    handleDelete,
    handleReset,

    handleImagesChange,
    handleRemoveImage,

    isSubmitting,
    isDeleting,
  } = useGalleryEdit({
    id,
  })

  if (!gallery) {
    return <GalleryEditSkeleton />
  }

  return (
    <div className="space-y-6 p-6">
      <GalleryEditHeader gallery={gallery} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <ImageUpload
            title="Gallery Images"
            description="Upload gallery images."
            images={images}
            onUpload={handleImagesChange}
            onRemove={handleRemoveImage}
          />

          <GalleryForm
            title="Edit Gallery"
            submitText="Save Changes"
            form={form}
            isSubmitting={isSubmitting}
            showMetadata
            createdAt={gallery.createdAt}
            updatedAt={gallery.updatedAt}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>

        <div className="space-y-6">
          <GalleryCreationTipsCard />

          <GalleryDangerZone isDeleting={isDeleting} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}
