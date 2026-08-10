"use client"

// src/features/users/create/CreateUserPage.tsx
import { ErrorComponent } from "@/components/common/error"

import { UserCreateHeader } from "./components/UserCreateHeader"
import { UserCreationTipsCard } from "../shared/UserCreationTipsCard"
import { UserAvatarUpload } from "../shared/UserAvatarUpload"
import { UserForm } from "../shared/UserForm"

import { useUserCreate } from "./useUserCreate"

export function UserCreatePage() {
  const {
    form,

    avatar,

    isLoading,
    isError,

    refetch,

    handleSubmit,
    handleReset,
    handleUpload,

    isSubmitting,
  } = useUserCreate()

  if (isError) {
    return (
      <ErrorComponent
        title="Unable to load page"
        error="Something went wrong while loading the required resources."
        onRetry={refetch}
      />
    )
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <UserCreateHeader />

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-4 xl:col-span-3">
          <UserAvatarUpload
            name={form.watch("name") || "New User"}
            image={avatar?.url}
            uploading={avatar?.status === "uploading"}
            progress={avatar?.progress ?? 0}
            completed={avatar?.status === "completed"}
            isEditable
            onUpload={handleUpload}
          />

          <UserCreationTipsCard />
        </div>

        <div className="lg:col-span-8 xl:col-span-9">
          <UserForm
            mode="create"
            form={form}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  )
}
