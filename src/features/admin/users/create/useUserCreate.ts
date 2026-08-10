"use client"

import { ROUTES } from "@/config/routes"
// src/features/users/create/useUserCreate.ts
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  createUserSchema,
  type CreateUserFormValues,
} from "@/schemas/user/create-user.schema"

import { useCreateUserMutation } from "@/store/api/user.api"

import { getErrorMessage } from "@/utils/get-error-message"

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

import { CloudinaryFolder } from "@/types/upload"
import type { UploadFile } from "@/types/common"

export function useUserCreate() {
  const router = useRouter()

  const [avatar, setAvatar] = useState<UploadFile | null>(null)

  const form = useForm<CreateUserFormValues>({
    resolver: zodResolver(createUserSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
      role: "ADMIN",
      avatarId: null,
    },
  })

  const [createUser, createState] = useCreateUserMutation()

  const { upload } = useCloudinaryUpload()

  async function handleUpload(file: File) {
    const preview = URL.createObjectURL(file)

    setAvatar({
      id: "",
      url: preview,
      status: "uploading",
      progress: 0,
    })

    try {
      const uploadedFile = await upload(file, CloudinaryFolder.USERS, {
        onProgress(progress) {
          setAvatar((prev) =>
            prev
              ? {
                  ...prev,
                  progress,
                }
              : null
          )
        },
      })

      URL.revokeObjectURL(preview)

      form.setValue("avatarId", uploadedFile.id, {
        shouldDirty: true,
        shouldValidate: true,
      })

      setAvatar({
        id: uploadedFile.id,
        url: uploadedFile.url,
        status: "completed",
        progress: 100,
      })
    } catch (error) {
      URL.revokeObjectURL(preview)

      toast.error(getErrorMessage(error))

      setAvatar((prev) =>
        prev
          ? {
              ...prev,
              status: "error",
              errorMessage: getErrorMessage(error),
            }
          : null
      )
    }
  }

  async function handleSubmit(values: CreateUserFormValues) {
    try {
      const { repeatPassword, ...body } = values

      await createUser({
        ...body,
        password: body.password ?? "",
        avatarId: body.avatarId ?? undefined,
      }).unwrap()

      toast.success("User created successfully.")

      router.push(ROUTES.ADMIN.USERS.INDEX)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  function handleReset() {
    form.reset()

    setAvatar(null)
  }

  return {
    form,

    avatar,

    isLoading: false,
    isFetching: false,
    isError: false,

    refetch: () => {},

    handleSubmit,
    handleUpload,
    handleReset,

    isSubmitting: createState.isLoading,
  }
}
