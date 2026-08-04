"use client"

import { CommitteeForm } from "../shared/CommitteeForm"
import { CommitteeCreateHeader } from "./components/CommitteeCreateHeader"
import { CommitteeInformationCard } from "../shared/CommitteeInformationCard"
import { useCommitteeCreate } from "./useCommitteeCreate"

export function CreateCommitteePage() {
  const {
    form,

    avatar,

    handleSubmit,
    handleAvatarChange,

    isSubmitting,
    isUploading,
    uploadProgress,
  } = useCommitteeCreate()

  return (
    <div className="space-y-6 p-6">
      <CommitteeCreateHeader />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <CommitteeForm
            title="Committee Information"
            submitText="Create Committee Member"
            form={form}
            avatar={avatar}
            isSubmitting={isSubmitting || isUploading}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            onAvatarChange={handleAvatarChange}
            onSubmit={handleSubmit}
            onClear={() => form.reset()}
          />
        </div>

        <div className="xl:col-span-4">
          <CommitteeInformationCard
            title="Committee Preview"
            member={form.getValues()}
            showMetadata={false}
          />
        </div>
      </div>
    </div>
  )
}
