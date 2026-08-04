"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import {
  committeeSchema,
  type CommitteeFormValues,
} from "@/schemas/committee.schema"

import { CloudinaryFolder } from "@/types/upload"

import { getErrorMessage } from "@/utils/get-error-message"
import {
  useDeleteCommitteeMemberMutation,
  useGetCommitteeMemberQuery,
  useUpdateCommitteeMemberMutation,
} from "@/store/api/committee.api"
import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

interface UseCommitteeEditProps {
  id: string
}

export function useCommitteeEdit({ id }: UseCommitteeEditProps) {
  const router = useRouter()
  const memberQuery = useGetCommitteeMemberQuery(id)
  const member = memberQuery.data
  const [avatar, setAvatar] = useState<string>()

  const form = useForm<CommitteeFormValues>({
    resolver: zodResolver(committeeSchema),
    defaultValues: {
      name: "",
      designation: undefined,
      phone: "",
      email: "",
      avatarId: "",
      address: "",
      joiningDate: "",
      endDate: "",
      isActive: true,
    },
  })

  useEffect(() => {
    if (!member) return

    form.reset({
      name: member.name,
      designation: member.designation,
      phone: member.phone ?? "",
      email: member.email ?? "",
      avatarId: member.avatar?.id ?? "",
      address: member.address ?? "",
      joiningDate: member.joiningDate.split("T")[0],
      endDate: member.endDate?.split("T")[0] ?? "",
      isActive: member.isActive,
    })

    setAvatar(member.avatar?.url)
  }, [member, form])

  const [updateCommittee, updateState] = useUpdateCommitteeMemberMutation()
  const [deleteCommittee, deleteState] = useDeleteCommitteeMemberMutation()
  const { upload, uploading, progress } = useCloudinaryUpload()

  async function handleSubmit(values: CommitteeFormValues) {
    try {
      await updateCommittee({
        id,
        body: {
          ...values,
          phone: values.phone || undefined,
          email: values.email || undefined,
          avatarId: values.avatarId || undefined,
          address: values.address || undefined,
          endDate: values.endDate || undefined,
        },
      }).unwrap()

      toast.success("Committee member updated successfully.")
      router.push(`/committee/${id}`)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function handleDelete() {
    try {
      await deleteCommittee(id).unwrap()

      toast.success("Committee member deleted.")
      router.push("/committee")
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function handleAvatarChange(_file: File) {
    try {
      const uploaded = await upload(_file, CloudinaryFolder.COMMITTEE)

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
    member,
    memberQuery,
    form,
    avatar,
    handleSubmit,
    handleDelete,
    handleAvatarChange,
    isSubmitting: updateState.isLoading,
    isDeleting: deleteState.isLoading,
    isUploading: uploading,
    uploadProgress: progress,
  }
}
