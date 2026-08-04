// src/app/.../CommitteeDetailsPage.tsx

"use client"

import { ErrorComponent } from "@/components/common/error"
import { getErrorMessage } from "@/utils/get-error-message"

import { useGetCommitteeMemberQuery } from "@/store/api/committee.api"

import { CommitteeDetailsHeader } from "./components/CommitteeDetailsHeader"
import { CommitteeDetailsSkeleton } from "./components/CommitteeDetailsSkeleton"
import { CommitteeInformationCard } from "../shared/CommitteeInformationCard"
import { CommitteeProfileCard } from "./components/CommitteeProfileCard"
import { CommitteeTimelineCard } from "./components/CommitteeTimelineCard"

interface CommitteeDetailsPageProps {
  id: string
}

export function CommitteeDetailsPage({ id }: CommitteeDetailsPageProps) {
  const {
    data: member,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCommitteeMemberQuery(id)

  if (isLoading) {
    return <CommitteeDetailsSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load committee member."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  if (!member) {
    return null
  }

  return (
    <div className="space-y-6 p-6">
      <CommitteeDetailsHeader
        id={member.id}
        name={member.name}
        designation={member.designation}
        isActive={member.isActive}
      />

      <div className="grid items-start gap-6 xl:grid-cols-12">
        {/* Profile Sidebar */}
        <div className="xl:col-span-4">
          <CommitteeProfileCard member={member} />
        </div>

        {/* Main Content Area (Information & Timeline stacked properly) */}
        <div className="space-y-6 xl:col-span-8">
          <CommitteeInformationCard member={member} />
          <CommitteeTimelineCard member={member} />
        </div>
      </div>
    </div>
  )
}
