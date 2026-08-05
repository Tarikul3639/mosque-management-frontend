"use client"

import { ImageUpload } from "@/components/common/image-upload"

import { GalleryForm } from "../shared/GalleryForm"
// import { GalleryOrderCard } from "../shared/GalleryOrderCard"

import { GalleryCreateHeader } from "./components/GalleryCreateHeader"
import { GalleryCreationTipsCard } from "../shared/GalleryCreationTipsCard"

import { useGalleryCreate } from "./useGalleryCreate"

export function CreateGalleryPage() {
    const {
        form,

        images,

        handleSubmit,
        handleReset,

        handleImagesChange,
        handleRemoveImage,

        isSubmitting,
    } = useGalleryCreate()

    return (
        <div className="space-y-6 p-6">
            <GalleryCreateHeader />

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
                        title="Gallery Information"
                        submitText="Create Gallery"
                        form={form}
                        isSubmitting={isSubmitting}
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                    />
                </div>

                <div className="space-y-6">
                    {/* <GalleryOrderCard
                        form={form}
                    /> */}

                    <GalleryCreationTipsCard />
                </div>
            </div>
        </div>
    )
}