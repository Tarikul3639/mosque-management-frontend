"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { toast } from "sonner"

import { getErrorMessage } from "@/utils/get-error-message"
import { CloudinaryFolder } from "@/types/upload"
import type { UploadFile } from "@/types/common"

import { donorSchema, type DonorFormValues } from "@/schemas/donor.schema"

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

import { useCreateDonorMutation } from "@/store/api/donor.api"

import { CreateDonorHeader } from "./components/CreateDonorHeader"
import { DonorAvatarCard } from "./components/DonorAvatarCard"
import { DonorForm } from "../shared/DonorForm"

export function CreateDonorPage() {
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

  const [createDonor, { isLoading: isSubmitting }] = useCreateDonorMutation()

  const onSubmit = async (values: DonorFormValues) => {
    try {
      const donor = await createDonor(values).unwrap()

      toast.success("Donor created successfully.")

      router.push(`/donors/${donor.id}`)
    } catch (error) {
      console.error(error)

      toast.error("Failed to create donor.", {
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

  return (
    <div className="space-y-6 p-6">
      <CreateDonorHeader
        title="Create Donor"
        description="Add a new donor to the mosque management system."
        backHref="/donors"
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:col-span-4 2xl:col-span-3">
          <DonorAvatarCard
            name={form.watch("name")}
            avatarUrl={avatar?.url}
            uploading={avatar?.status === "uploading"}
            progress={avatar?.progress ?? 0}
            completed={avatar?.status === "completed"}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
          <DonorForm
            title="Create New Donor"
            submitText="Create Donor"
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}