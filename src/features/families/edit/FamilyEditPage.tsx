"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { ErrorComponent } from "@/components/common/error"
import { getErrorMessage } from "@/utils/get-error-message"

import {
  useGetFamilyDetailsQuery,
  useUpdateFamilyMutation,
} from "@/store/api/family.api"

import { CloudinaryFolder } from "@/types/upload"
import type { UploadFile } from "@/types/common"

import { familySchema, type FamilyFormValues } from "@/schemas/family.schema"

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

import { FamilyEditHeader } from "./components/FamilyEditHeader"
import { FamilyEditProfileCard } from "./components/FamilyEditProfileCard"
import { FamilyEditForm } from "./components/FamilyEditForm"
import { FamilyEditSkeleton } from "./components/FamilyEditSkeleton"

import { toast } from "sonner"

interface FamilyEditPageProps {
  id: string
}

export function FamilyEditPage({ id }: FamilyEditPageProps) {
  const router = useRouter()

  const [avatar, setAvatar] = useState<UploadFile | null>(null)

  const form = useForm<FamilyFormValues>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      headName: "",
      phone: "",
      address: "",
      avatarId: "",
      isActive: true,
    },
  })

  const { upload } = useCloudinaryUpload()

  const {
    data: family,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetFamilyDetailsQuery(id)

  const [updateFamily, { isLoading: isSubmitting }] = useUpdateFamilyMutation()

  // function to get the original avatar from the family data
  const getOriginalAvatar = useCallback((): UploadFile | null => {
    if (!family?.avatar) return null

    return {
      id: family.avatar.id,
      url: family.avatar.url,
      status: "completed",
      progress: 100,
    }
  }, [family])

  useEffect(() => {
    if (!family) return

    form.reset({
      familyNo: family.familyNo,
      headName: family.headName,
      phone: family.phone ?? "",
      email: family.email ?? "",
      address: family.address ?? "",
      avatarId: family.avatar?.id ?? "",
      isActive: family.isActive,
    })

    setAvatar(getOriginalAvatar())
  }, [family, form, getOriginalAvatar])

  const onSubmit = async (values: FamilyFormValues) => {
    try {
      await updateFamily({
        id: family!.id,
        body: values,
      }).unwrap()

      toast.success("Family updated successfully.")

      router.push(`/families/${family!.id}`)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update family.", {
        description: getErrorMessage(err),
      })
    }
  }

  const handleAvatarChange = async (file: File) => {
    const preview = URL.createObjectURL(file)

    setAvatar({
      id: "",
      url: preview,
      status: "uploading",
      progress: 0,
    })

    try {
      const uploaded = await upload(file, CloudinaryFolder.FAMILIES, {
        onProgress: (progress) => {
          setAvatar((prev) => (prev ? { ...prev, progress } : prev))
        },
      })

      URL.revokeObjectURL(preview)

      form.setValue("avatarId", uploaded.id, {
        shouldDirty: true,
        shouldValidate: true,
      })

      setAvatar({
        id: uploaded.id,
        url: uploaded.url,
        status: "completed",
        progress: 100,
      })
    } catch (error) {
      URL.revokeObjectURL(preview)

      console.error(error)
      toast.error("Failed to upload avatar.", {
        description: getErrorMessage(error),
      })

      setAvatar((prev) =>
        prev
          ? {
              ...prev,
              status: "error",
              errorMessage: getErrorMessage(error),
            }
          : prev
      )
    }
  }

  // Reset form and avatar to original values
  // function handleReset() {
  //   if (avatar?.url.startsWith("blob:")) {
  //     URL.revokeObjectURL(avatar.url)
  //   }

  //   if (!family) return

  //   form.reset({
  //     headName: family.headName,
  //     phone: family.phone ?? "",
  //     address: family.address ?? "",
  //     avatarId: family.avatar?.id ?? "",
  //     isActive: family.isActive,
  //   })

  //   setAvatar(getOriginalAvatar())
  // }

  if (isLoading) {
    return <FamilyEditSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load family."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  if (!family) {
    return null
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <FamilyEditHeader family={family} />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4 2xl:col-span-3">
          <FamilyEditProfileCard
            family={family}
            isEditable
            uploading={avatar?.status === "uploading"}
            progress={avatar?.progress ?? 0}
            completed={avatar?.status === "completed"}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        <div className="xl:col-span-8 2xl:col-span-9">
          <FamilyEditForm
            family={family}
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}
