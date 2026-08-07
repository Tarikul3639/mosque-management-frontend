// src/features/user/edit/useUserEdit.ts

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  updateUserSchema,
  type UpdateUserFormValues,
} from "@/schemas/user/update-user.schema"

import {
  useDeleteUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
} from "@/store/api/user.api"

import { getErrorMessage } from "@/utils/get-error-message"
import { getDirtyValues } from "@/utils/get-dirty-values"
import { UploadFile } from "@/types/common"
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"
import { CloudinaryFolder } from "@/types/upload"

export function useUserEdit({ id }: { id: string }) {
  const router = useRouter()
  const [avatar, setAvatar] = useState<UploadFile | null>(null)

  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetUserQuery(id)

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      repeatPassword: "",
      role: "ADMIN",
      status: "ACTIVE",
      avatarId: null,
    },

    // When the user data is fetched, update the form values
    values: user
      ? {
          name: user.name ?? "",
          email: user.email ?? "",
          phone: user.phone ?? "",
          password: "",
          repeatPassword: "",
          role: user.role,
          status: user.status,
          avatarId: user.avatar?.id ?? null,
        }
      : undefined,
  })

  const [updateUser, updateState] = useUpdateUserMutation()
  const [deleteUser, deleteState] = useDeleteUserMutation()
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
        onProgress: (progress) => {
          setAvatar((prev) => {
            if (!prev) return null
            return { ...prev, progress }
          })
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
      toast.error(getErrorMessage(error))
      URL.revokeObjectURL(preview)

      setAvatar((prev) => {
        if (!prev) return null
        return {
          ...prev,
          status: "error",
          errorMessage: getErrorMessage(error),
        }
      })
    }
  }

  async function handleSubmit(values: UpdateUserFormValues) {
    try {
      // Remove the repeatPassword field from the values object before sending it to the API
      const { repeatPassword, ...rest } = values

      // Get only the dirty values from the form state
      const dirtyValues = getDirtyValues(form.formState.dirtyFields, rest)

      // If the password field is not dirty, remove it from the dirtyValues object
      if (!dirtyValues.password) {
        delete dirtyValues.password
      }

      await updateUser({
        id,
        body: {
          ...dirtyValues,
          password: dirtyValues.password || undefined,
          avatarId: dirtyValues.avatarId ?? undefined,
        },
      }).unwrap()

      toast.success("User updated successfully.")

      form.reset({
        ...values,
        password: "",
        repeatPassword: "",
      })
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function handleDelete() {
    try {
      await deleteUser(id).unwrap()
      toast.success("User deleted successfully.")
      router.push("/users")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  function handleReset() {
    if (!user) return

    form.reset({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      password: "",
      repeatPassword: "",
      role: user.role,
      status: user.status,
      avatarId: user.avatar?.id ?? null,
    })

    setAvatar(
      user?.avatar
        ? {
            id: user?.avatar?.id ?? "",
            url: user?.avatar?.url ?? undefined,
            status: "completed",
            progress: 100,
          }
        : null
    )
  }

  return {
    user,
    form,
    avatar,
    isLoading,
    isFetching,
    isError,
    refetch,
    handleSubmit,
    handleUpload,
    handleReset,
    handleDelete,
    isSubmitting: updateState.isLoading,
    isDeleting: deleteState.isLoading,
  }
}
