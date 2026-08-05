// src/features/gallery/create/useGalleryCreate.ts

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { gallerySchema, type GalleryFormValues } from "@/schemas/gallery.schema"
import type { UploadImage } from "@/components/common/image-upload"
import { CloudinaryFolder } from "@/types/upload"
import { getErrorMessage } from "@/utils/get-error-message"
import { useCreateGalleryMutation } from "@/store/api/gallery.api"
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

export function useGalleryCreate() {
  const router = useRouter()

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

  const [createGallery, createState] = useCreateGalleryMutation()

  const { upload } = useCloudinaryUpload()

  async function handleSubmit(values: GalleryFormValues) {
    try {
      const gallery = await createGallery({
        ...values,
        imageIds: images
          .filter((image) => image.completed)
          .map((image) => image.id),
        description: values.description || undefined,
      }).unwrap()

      toast.success("Gallery created successfully.")
      router.push(`/galleries/${gallery.id}`)
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

    setImages([])
    form.reset()
  }

  return {
    form,
    images,
    handleSubmit,
    handleImagesChange,
    handleRemoveImage,
    handleReset,
    isSubmitting: createState.isLoading,
  }
}
