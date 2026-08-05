"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { toast } from "sonner"

import { ErrorComponent } from "@/components/common/error"
import { getErrorMessage } from "@/utils/get-error-message"
import { CloudinaryFolder } from "@/types/upload"
import type { UploadFile } from "@/types/common"

import { donorSchema, type DonorFormValues } from "@/schemas/donor.schema"

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

import {
  useGetDonorDetailsQuery,
  useUpdateDonorMutation,
} from "@/store/api/donor.api"

import { DonorHeader } from "./components/DonorHeader"
import { DonorAvatarCard } from "./components/DonorAvatarCard"
import { DonorDangerZone } from "./components/DonorDangerZone"
import { DonorEditSkeleton } from "./components/DonorEditSkeleton"
import { DonorForm } from "../shared/DonorForm"

interface DonorEditPageProps {
  id: string
}

export function DonorEditPage({ id }: DonorEditPageProps) {
  const router = useRouter()

  const [avatar, setAvatar] = useState<UploadFile | null>(null)

  const form = useForm<DonorFormValues>({
    resolver: zodResolver(donorSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      avatarId: undefined,
      isActive: true,
    },
  })

  const { upload } = useCloudinaryUpload()

  const {
    data: donor,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetDonorDetailsQuery(id)

  const [updateDonor, { isLoading: isSubmitting }] = useUpdateDonorMutation()

  // donor theke original avatar banano - reset + initial load duitate use hobe
  const getOriginalAvatar = useCallback((): UploadFile | null => {
    if (!donor?.avatar) return null

    return {
      id: donor.avatar.id,
      url: donor.avatar.url,
      status: "completed",
      progress: 100,
    }
  }, [donor])

  useEffect(() => {
    if (!donor) return

    form.reset({
      name: donor.name,
      phone: donor.phone,
      email: donor.email ?? "",
      address: donor.address ?? "",
      avatarId: donor.avatar?.id ?? undefined,
      isActive: donor.isActive,
    })

    setAvatar(getOriginalAvatar())
  }, [donor, form, getOriginalAvatar])

  const onSubmit = async (values: DonorFormValues) => {
    try {
      await updateDonor({
        id: donor!.id,
        body: values,
      }).unwrap()

      toast.success("Donor updated successfully.")

      router.push(`/donors/${donor!.id}`)
    } catch (error) {
      console.error(error)

      toast.error("Failed to update donor.", {
        description: getErrorMessage(error),
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
      const uploaded = await upload(file, CloudinaryFolder.DONORS, {
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

  // reset: form + avatar duitai original state e ferot
  function handleReset() {
    if (avatar?.url.startsWith("blob:")) {
      URL.revokeObjectURL(avatar.url)
    }

    if (!donor) return

    form.reset({
      name: donor.name,
      phone: donor.phone,
      email: donor.email ?? "",
      address: donor.address ?? "",
      avatarId: donor.avatar?.id ?? undefined,
      isActive: donor.isActive,
    })

    setAvatar(getOriginalAvatar())
  }

  if (isLoading) {
    return <DonorEditSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load donor."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  if (!donor) {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      <DonorHeader donor={donor} />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-4 2xl:col-span-3">
          <DonorAvatarCard
            donor={donor}
            uploading={avatar?.status === "uploading"}
            progress={avatar?.progress ?? 0}
            completed={avatar?.status === "completed"}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
          <DonorForm
            title="Edit Donor"
            submitText="Save Changes"
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            showMetadata={true}
            createdAt={donor.createdAt}
            updatedAt={donor.updatedAt}
          />

          <DonorDangerZone donor={donor} />
        </div>
      </div>
    </div>
  )
}