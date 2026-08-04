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

export function useCommitteeCreate() {
  const router = useRouter()

  const [avatar, setAvatar] = useState<string>()

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
  const { upload, uploading, progress } = useCloudinaryUpload()

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
    try {
      const uploaded = await upload(file, CloudinaryFolder.COMMITTEE)

      form.setValue("avatarId", uploaded.id, {
        shouldDirty: true,
        shouldValidate: true,
      })

      setAvatar(uploaded.url)
    } catch (error) {
      console.error(error)
      toast.error("Failed to upload avatar.", {
        description: getErrorMessage(error),
      })
    }
  }

  return {
    form,

    avatar,

    handleSubmit,
    handleAvatarChange,

    isSubmitting: createState.isLoading,
    isUploading: uploading,
    uploadProgress: progress,
  }
}
