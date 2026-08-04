"use client"

import { ErrorComponent } from "@/components/common/error"
import { getErrorMessage } from "@/utils/get-error-message"

import { CommitteeForm } from "../shared/CommitteeForm"
import { CommitteeInformationCard } from "../shared/CommitteeInformationCard"

import { CommitteeDangerZone } from "./components/CommitteeDangerZone"
import { CommitteeEditHeader } from "./components/CommitteeEditHeader"
import { CommitteeEditSkeleton } from "./components/CommitteeEditSkeleton"

import { useCommitteeEdit } from "./useCommitteeEdit"

interface CommitteeEditPageProps {
  id: string
}

export function CommitteeEditPage({ id }: CommitteeEditPageProps) {
  const {
    member,
    memberQuery,

    form,

    handleSubmit,
    handleDelete,
    handleAvatarChange,

    avatar,

    isSubmitting,
    isDeleting,
    isUploading,
    uploadProgress,
  } = useCommitteeEdit({
    id,
  })

  if (memberQuery.isLoading) {
    return <CommitteeEditSkeleton />
  }

  if (memberQuery.isError) {
    return (
      <ErrorComponent
        title="Failed to load committee member."
        error={getErrorMessage(memberQuery.error)}
        onRetry={memberQuery.refetch}
      />
    )
  }

  if (!member) {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      <CommitteeEditHeader
        id={member.id}
        name={member.name}
        designation={member.designation}
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <CommitteeForm
            title="Edit Committee Member"
            submitText="Save Changes"
            form={form}
            avatar={avatar}
            isSubmitting={isSubmitting}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            onAvatarChange={handleAvatarChange}
            onSubmit={handleSubmit}
            onClear={() => form.reset()}
          />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <CommitteeInformationCard member={member} title="Preview" />

          <CommitteeDangerZone
            isDeleting={isDeleting}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  )
}
