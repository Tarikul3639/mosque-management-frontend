"use client"

import { ROUTES } from "@/config/routes"
// src/features/gallery/edit/useGalleryEdit.ts
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { gallerySchema, type GalleryFormValues } from "@/schemas/gallery.schema"
import type { UploadImage } from "@/components/common/image-upload"
import { CloudinaryFolder } from "@/types/upload"
import { getErrorMessage } from "@/utils/get-error-message"
import {
  useDeleteGalleryMutation,
  useGetGalleryQuery,
  useUpdateGalleryMutation,
} from "@/store/api/gallery.api"
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

interface UseGalleryEditProps {
  id: string
}

export function useGalleryEdit({ id }: UseGalleryEditProps) {
  const router = useRouter()

  const { data: gallery } = useGetGalleryQuery(id)

  const [images, setImages] = useState<UploadImage[]>([])

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      title: "",
      description: "",
      order: 1,
      imageIds: [],
    },
  })

  const getOriginalImages = useCallback((): UploadImage[] => {
    if (!gallery) {
      return []
    }

    return gallery.images.map((image) => ({
      id: image.id,
      url: image.url,
      progress: 100,
      uploading: false,
      completed: true,
      error: false,
    }))
  }, [gallery])

  useEffect(() => {
    if (!gallery) {
      return
    }

    form.reset({
      title: gallery.title,
      description: gallery.description ?? "",
      order: gallery.order,
      imageIds: gallery.images.map((image) => image.id),
    })

    setImages(getOriginalImages())
  }, [gallery, form, getOriginalImages])

  const [updateGallery, updateState] = useUpdateGalleryMutation()
  const [deleteGallery, deleteState] = useDeleteGalleryMutation()

  const { upload } = useCloudinaryUpload()

  async function handleSubmit(values: GalleryFormValues) {
    try {
      await updateGallery({
        id,
        body: {
          ...values,
          imageIds: images
            .filter((image) => image.completed)
            .map((image) => image.id),
          description: values.description || undefined,
        },
      }).unwrap()

      toast.success("Gallery updated successfully.")
      router.push(ROUTES.ADMIN.GALLERY.DETAIL(id))
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function handleDelete() {
    try {
      await deleteGallery(id).unwrap()
      toast.success("Gallery deleted.")
      router.push(ROUTES.ADMIN.GALLERY.INDEX)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

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
        const uploaded = await upload(file, CloudinaryFolder.GALLERY, {
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

  function handleReset() {
    images.forEach((image) => {
      if (image.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url)
      }
    })

    if (!gallery) {
      return
    }

    form.reset({
      title: gallery.title,
      description: gallery.description ?? "",
      order: gallery.order,
      imageIds: gallery.images.map((image) => image.id),
    })

    setImages(getOriginalImages())
  }

  return {
    gallery,
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
