"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { toast } from "sonner"

import { ErrorComponent } from "@/components/common/error"
import { getErrorMessage } from "@/utils/get-error-message"
import { CloudinaryFolder } from "@/types/upload"

import { donorSchema, type DonorFormValues } from "@/schemas/donor.schema"

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

import {
  useGetDonorDetailsQuery,
  useUpdateDonorMutation,
} from "@/store/api/donor.api"

import { DonorHeader } from "./components/DonorHeader"
import { DonorAvatarCard } from "./components/DonorAvatarCard"
import { DonorDangerZone } from "./components/DonorDangerZone"
import { DonorEditForm } from "./components/DonorEditForm"
import { DonorEditSkeleton } from "./components/DonorEditSkeleton"

interface DonorEditPageProps {
  id: string
}

export function DonorEditPage({ id }: DonorEditPageProps) {
  const router = useRouter()

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

  const { upload, uploading, progress } = useCloudinaryUpload()

  const {
    data: donor,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetDonorDetailsQuery(id)

  const [updateDonor, { isLoading: isSubmitting }] = useUpdateDonorMutation()

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
  }, [donor, form])

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
    try {
      const uploaded = await upload(file, CloudinaryFolder.DONORS)

      form.setValue("avatarId", uploaded.id, {
        shouldDirty: true,
        shouldValidate: true,
      })
    } catch (error) {
      console.error(error)

      toast.error("Failed to upload avatar.", {
        description: getErrorMessage(error),
      })
    }
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
            uploading={uploading}
            progress={progress}
            completed={!uploading && progress === 100}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
          <DonorEditForm
            donor={donor}
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />

          <DonorDangerZone donor={donor} />
        </div>
      </div>
    </div>
  )
}
