"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useCreateFamilyMutation } from "@/store/api/family.api"
import { CloudinaryFolder } from "@/types/upload"
import type { UploadFile } from "@/types/common"

import { familySchema, type FamilyFormValues } from "@/schemas/family.schema"

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"
import { getErrorMessage } from "@/utils/get-error-message"

import { FamilyCreateHeader } from "./FamilyCreateHeader"
import { FamilyCreateProfileCard } from "./FamilyCreateProfileCard"
import { FamilyCreateForm } from "./FamilyCreateForm"

export function FamilyCreatePage() {
  const router = useRouter()

  const [avatar, setAvatar] = useState<UploadFile | null>(null)

  const form = useForm<FamilyFormValues>({
    resolver: zodResolver(familySchema),
    defaultValues: {
      familyNo: "",
      headName: "",
      phone: "",
      email: "",
      address: "",
      avatarId: undefined,
      isActive: true,
    },
  })

  const { upload } = useCloudinaryUpload()

  const [createFamily, { isLoading: isSubmitting }] = useCreateFamilyMutation()

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

  const onSubmit = async (values: FamilyFormValues) => {
    try {
      const family = await createFamily(values).unwrap()

      toast.success("Family created successfully.")

      router.push(`/families/${family.id}`)
    } catch (err) {
      console.error(err)

      toast.error("Failed to create family.", {
        description: getErrorMessage(err),
      })
    }
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <FamilyCreateHeader />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4 2xl:col-span-3">
          <FamilyCreateProfileCard
            name={form.watch("headName")}
            image={avatar?.url}
            isActive={form.watch("isActive")}
            isEditable
            uploading={avatar?.status === "uploading"}
            progress={avatar?.progress ?? 0}
            completed={avatar?.status === "completed"}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        <div className="xl:col-span-8 2xl:col-span-9">
          <FamilyCreateForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}
