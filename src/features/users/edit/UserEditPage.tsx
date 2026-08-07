// src/features/user/edit/UserEditPage.tsx

"use client"

import { ErrorComponent } from "@/components/common/error"

import { UserForm } from "../shared/UserForm"
import { UserAvatarUpload } from "../shared/UserAvatarUpload"

import { UserEditHeader } from "./components/UserEditHeader"
import { UserDangerZone } from "./components/UserDangerZone"
import { UserEditSkeleton } from "./components/UserEditSkeleton"
import { EmptyState } from "@/components/common/empty-state"

import { useUserEdit } from "./useUserEdit"

export function UserEditPage({ id }: { id: string }) {
  const {
    user,

    form,
    avatar,

    isLoading,
    isError,
    refetch,

    isSubmitting,
    isDeleting,

    handleSubmit,
    handleUpload,
    handleReset,
    handleDelete,
  } = useUserEdit({ id })

  if (isLoading) {
    return <UserEditSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Error"
        error="An error occurred while loading the user."
        onRetry={refetch}
      />
    )
  }

  if (!user) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
        <EmptyState
          title="User Not Found"
          description="The user you are looking for does not exist."
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <UserEditHeader user={user} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div>
          <UserAvatarUpload
            name={form.watch("name") || user.name}
            image={avatar?.url || user.avatar?.url}
            // isEditable
            uploading={avatar?.status === "uploading"}
            progress={avatar?.progress ?? 0}
            completed={avatar?.status === "completed"}
            onUpload={handleUpload}
          />
        </div>

        <div className="space-y-6 xl:col-span-2">
          <UserForm
            mode="edit"
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />

          {/* Separator with level */}
          <div className="flex items-center space-x-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">Danger Zone</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <UserDangerZone isDeleting={isDeleting} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}
