"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { toast } from "sonner"

import {
  committeeSchema,
  type CommitteeFormValues,
} from "@/schemas/committee.schema"

import { getErrorMessage } from "@/utils/get-error-message"
import { useCreateCommitteeMemberMutation } from "@/store/api/committee.api"

import { Designation } from "@/constants/designation"
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"
import { CloudinaryFolder } from "@/types/upload"
import type { UploadFile } from "@/types/common"

export function useCommitteeCreate() {
  const router = useRouter()

  // ekta e single state - avatar er status, progress, url sob ekhane
  const [avatar, setAvatar] = useState<UploadFile | null>(null)

  const form = useForm<CommitteeFormValues>({
    resolver: zodResolver(committeeSchema),

    defaultValues: {
      name: "",
      designation: Designation.MEMBER,
      phone: "",
      email: "",
      avatarId: "",
      address: "",
      joiningDate: new Date().toISOString().split("T")[0],
      endDate: "",
      isActive: true,
    },
  })

  const [createCommittee, createState] = useCreateCommitteeMemberMutation()
  const { upload } = useCloudinaryUpload()

  async function handleSubmit(values: CommitteeFormValues) {
    try {
      const member = await createCommittee({
        ...values,
        phone: values.phone || undefined,
        email: values.email || undefined,
        avatarId: values.avatarId || undefined,
        address: values.address || undefined,
        endDate: values.endDate || undefined,
      }).unwrap()

      toast.success("Committee member created successfully.")

      router.push(`/committee/${member.id}`)
    } catch (error) {
      toast.error("Failed to create committee member.", {
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
      const uploaded = await upload(file, CloudinaryFolder.COMMITTEE, {
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

  const handleRemoveAvatar = () => {
    if (avatar?.url.startsWith("blob:")) {
      URL.revokeObjectURL(avatar.url)
    }

    setAvatar(null)

    form.setValue("avatarId", "", {
      shouldDirty: true,
      shouldValidate: true,
    })
  }

  return {
    form,

    avatar,

    handleSubmit,
    handleAvatarChange,
    handleRemoveAvatar,

    isSubmitting: createState.isLoading,
  }
}
