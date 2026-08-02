"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { toast } from "sonner"

import { getErrorMessage } from "@/utils/get-error-message"
import { CloudinaryFolder } from "@/types/upload"

import { donorSchema, type DonorFormValues } from "@/schemas/donor.schema"

import { useCloudinaryUpload } from "@/hooks/use-cloudinary-upload"

import { useCreateDonorMutation } from "@/store/api/donor.api"

import { CreateDonorHeader } from "./components/CreateDonorHeader"
import { DonorAvatarCard } from "./components/DonorAvatarCard"
import { DonorCreateForm } from "./components/DonorCreateForm"

export function CreateDonorPage() {
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
            avatarUrl={undefined}
            uploading={uploading}
            progress={progress}
            completed={!uploading && progress === 100}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
          <DonorCreateForm
            title="Create Donor"
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  )
}
