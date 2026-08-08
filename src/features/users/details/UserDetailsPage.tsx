"use client"

// src/features/user/details/UserDetailsPage.tsx
import { ErrorComponent } from "@/components/common/error"

import { UserDetailsHeader } from "./components/UserDetailsHeader"
import { UserDetailsSkeleton } from "./components/UserDetailsSkeleton"
import { UserAvatarCard } from "./components/UserAvatarCard"
import { UserInformationCard } from "./components/UserInformationCard"
import { UserActivityCard } from "./components/UserActivityCard"
import { EmptyState } from "@/components/common/empty-state"

import { useUser } from "./useUser"

export function UserDetailsPage({ id }: { id: string }) {
  const {
    user,

    isLoading,
    isError,

    refetch,
  } = useUser({ id })

  if (isLoading) {
    return <UserDetailsSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Error"
        error="An error occurred while fetching user details."
        onRetry={refetch}
      />
    )
  }

  if (!user) {
    return (
      <EmptyState
        title="User Not Found"
        description="The user you are looking for does not exist."
      />
    )
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <UserDetailsHeader user={user} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div>
          <UserAvatarCard user={user} />
        </div>

        <div className="space-y-6 xl:col-span-2">
          <UserInformationCard user={user} />

          <UserActivityCard user={user} />
        </div>
      </div>
    </div>
  )
}
