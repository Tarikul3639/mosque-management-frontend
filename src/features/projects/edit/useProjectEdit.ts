"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { projectSchema, type ProjectFormValues } from "@/schemas/project.schema"
import type { UploadImage } from "@/components/common/image-upload"
import { CloudinaryFolder } from "@/types/upload"
import { getErrorMessage } from "@/utils/get-error-message"
import {
  useDeleteProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "@/store/api/project.api"
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

interface UseProjectEditProps {
  id: string
}

export function useProjectEdit({ id }: UseProjectEditProps) {
  const router = useRouter()

  const { data: project } = useGetProjectQuery(id)
  const [images, setImages] = useState<UploadImage[]>([])

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: 0,
      spent: 0,
      progress: 0,
      status: "PLANNING",
      imageIds: [],
      startDate: "",
      endDate: "",
    },
  })

  // prepare original images for reset
  const getOriginalImages = useCallback((): UploadImage[] => {
    if (!project) return []

    return project.images.map((image) => ({
      id: image.id,
      url: image.url,
      progress: 100,
      uploading: false,
      completed: true,
      error: false,
    }))
  }, [project])

  useEffect(() => {
    if (!project) return

    form.reset({
      title: project.title,
      description: project.description ?? "",
      budget: Number(project.budget),
      spent: Number(project.spent),
      progress: project.progress,
      status: project.status,
      imageIds: project.images.map((image) => image.id),
      startDate: project.startDate?.split("T")[0] ?? "",
      endDate: project.endDate?.split("T")[0] ?? "",
    })

    setImages(getOriginalImages())
  }, [project, form, getOriginalImages])

  const [updateProject, updateState] = useUpdateProjectMutation()
  const [deleteProject, deleteState] = useDeleteProjectMutation()

  async function handleSubmit(values: ProjectFormValues) {
    try {
      await updateProject({
        id,
        body: {
          ...values,
          imageIds: images
            .filter((image) => image.completed)
            .map((image) => image.id),
          description: values.description || undefined,
          startDate: values.startDate || undefined,
          endDate: values.endDate || undefined,
        },
      }).unwrap()

      toast.success("Project updated successfully.")
      router.push(`/projects/${id}`)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function handleDelete() {
    try {
      await deleteProject(id).unwrap()
      toast.success("Project deleted.")
      router.push("/projects")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  // Cloudinary Upload
  const { upload } = useCloudinaryUpload()

  async function handleImagesChange(files: File[]) {
    for (const file of files) {
      const tempId = crypto.randomUUID()
      const preview = URL.createObjectURL(file)

      setImages((prev) => [
        ...prev,
        {
          id: tempId,
          url: preview,
          progress: 0,
          uploading: true,
          completed: false,
          error: false,
        },
      ])

      try {
        const uploaded = await upload(file, CloudinaryFolder.PROJECTS, {
          onProgress: (progress) => {
            setImages((prev) =>
              prev.map((image) =>
                image.id === tempId
                  ? {
                      ...image,
                      progress,
                    }
                  : image
              )
            )
          },
        })

        setImages((prev) => {
          const updated = prev.map((image) =>
            image.id === tempId
              ? {
                  ...image,
                  id: uploaded.id,
                  url: uploaded.url,
                  progress: 100,
                  uploading: false,
                  completed: true,
                  error: false,
                }
              : image
          )

          form.setValue(
            "imageIds",
            updated.filter((image) => image.completed).map((image) => image.id),
            {
              shouldDirty: true,
              shouldValidate: true,
            }
          )

          return updated
        })
      } catch (error) {
        setImages((prev) =>
          prev.map((image) =>
            image.id === tempId
              ? {
                  ...image,
                  uploading: false,
                  completed: false,
                  error: true,
                }
              : image
          )
        )

        toast.error(getErrorMessage(error))
      }
    }
  }

  function handleRemoveImage(id: string) {
    setImages((prev) => {
      const image = prev.find((item) => item.id === id)

      if (image?.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url)
      }

      const updated = prev.filter((item) => item.id !== id)

      form.setValue(
        "imageIds",
        updated.filter((image) => image.completed).map((image) => image.id),
        {
          shouldDirty: true,
          shouldValidate: true,
        }
      )

      return updated
    })
  }

  // --- Reset handler ---
  function handleReset() {
    // Revoke object URLs for any blob URLs to avoid memory leaks
    images.forEach((image) => {
      if (image.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url)
      }
    })

    if (!project) return

    form.reset({
      title: project.title,
      description: project.description ?? "",
      budget: Number(project.budget),
      spent: Number(project.spent),
      progress: project.progress,
      status: project.status,
      imageIds: project.images.map((image) => image.id),
      startDate: project.startDate?.split("T")[0] ?? "",
      endDate: project.endDate?.split("T")[0] ?? "",
    })

    setImages(getOriginalImages())
  }

  return {
    project,
    form,
    images,
    handleSubmit,
    handleDelete,
    handleImagesChange,
    handleRemoveImage,
    handleReset,
    isSubmitting: updateState.isLoading,
    isDeleting: deleteState.isLoading,
  }
}
