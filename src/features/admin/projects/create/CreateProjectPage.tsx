"use client"

import { ImageUpload } from "@/components/common/image-upload"

import { ProjectForm } from "../shared/ProjectForm"
import { ProjectCreateHeader } from "./components/ProjectCreateHeader"
import { ProjectCreationTipsCard } from "./components/ProjectCreationTipsCard"

import { useProjectCreate } from "./useProjectCreate"

export function CreateProjectPage() {
  const {
    form,

    images,

    handleSubmit,
    handleReset,

    handleImagesChange,
    handleRemoveImage,

    isSubmitting,
  } = useProjectCreate()

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <ProjectCreateHeader />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <ImageUpload
            title="Project Gallery"
            description="Upload project gallery images."
            images={images}
            onUpload={handleImagesChange}
            onRemove={handleRemoveImage}
          />

          <ProjectForm
            title="Create Project"
            submitText="Create Project"
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>

        <div className="space-y-6">
          <ProjectCreationTipsCard />
        </div>
      </div>
    </div>
  )
}
