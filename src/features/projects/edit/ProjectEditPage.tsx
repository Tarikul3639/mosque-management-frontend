"use client"

import { useRouter } from "next/navigation"

import { ImageUpload } from "@/components/common/image-upload"

import { ProjectForm } from "../shared/ProjectForm"
import { ProjectInformationCard } from "../shared/ProjectInformationCard"

import { ProjectDangerZone } from "./components/ProjectDangerZone"
import { ProjectEditHeader } from "./components/ProjectEditHeader"
import { ProjectEditSkeleton } from "./components/ProjectEditSkeleton"

import { useProjectEdit } from "./useProjectEdit"

interface ProjectEditPageProps {
  id: string
}

export function ProjectEditPage({ id }: ProjectEditPageProps) {
  const router = useRouter()

  const {
    project,

    form,

    images,

    handleSubmit,
    handleDelete,
    handleReset,

    handleImagesChange,
    handleRemoveImage,

    isSubmitting,
    isDeleting,
  } = useProjectEdit({
    id,
  })

  if (!project) {
    return <ProjectEditSkeleton />
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <ProjectEditHeader project={project} />

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
            title="Edit Project"
            submitText="Save Changes"
            form={form}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            showMetadata
            createdAt={project.createdAt}
            updatedAt={project.updatedAt}
            onReset={() => handleReset()}
          />
        </div>

        <div className="space-y-6">
          <ProjectInformationCard project={project} />

          <ProjectDangerZone isDeleting={isDeleting} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}
