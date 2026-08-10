"use client"

// src/features/families/details/FamilyDetailsPage.tsx
import { useState } from "react"

import { ErrorComponent } from "@/components/common/error"
import { getErrorMessage } from "@/utils/get-error-message"
import { useGetFamilyDetailsQuery } from "@/store/api/family.api"

import { FamilyHeader } from "./components/FamilyHeader"
import { FamilyProfileCard } from "./components/FamilyProfileCard"
import { FamilyOverviewCard } from "./components/FamilyOverviewCard"
import { FamilyPaymentSummaryCard } from "./components/FamilyPaymentSummaryCard"
import { FamilyPaymentHistory } from "./components/FamilyPaymentHistory"
import { CurrentFeeCard } from "./components/CurrentFeeCard"
import { FeeHistoryCard } from "./components/FeeHistoryCard"
import { FamilyDetailsSkeleton } from "./components/FamilyDetailsSkeleton"

import { CreateFamilyFeeDialog } from "@/features/admin/family-fees/create/CreateFamilyFeeDialog"
import { EditFamilyFeeDialog } from "@/features/admin/family-fees/edit/EditFamilyFeeDialog"

import { useCreateFamilyFee } from "@/features/admin/family-fees/create/useCreateFamilyFee"
import { useEditFamilyFee } from "@/features/admin/family-fees/edit/useEditFamilyFee"

interface FamilyDetailsPageProps {
  id: string
}

export function FamilyDetailsPage({ id }: FamilyDetailsPageProps) {
  const {
    data: family,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetFamilyDetailsQuery(id)

  const [createOpen, setCreateOpen] = useState(false)

  const [editOpen, setEditOpen] = useState(false)

  const [selectedFeeId, setSelectedFeeId] = useState<string>("")

  const createFee = useCreateFamilyFee({
    familyId: id,
    onSuccess: () => {
      setCreateOpen(false)
    },
  })

  const editFee = useEditFamilyFee({
    familyId: id,
    feeId: selectedFeeId,
    onSuccess: () => {
      setEditOpen(false)
    },
  })

  if (isLoading) {
    return <FamilyDetailsSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load family."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  if (!family) {
    return null
  }

  return (
    <>
      <div className="space-y-6 px-2 py-4 sm:p-6">
        <FamilyHeader family={family} />

        <div className="grid gap-6 xl:grid-cols-12">
          <div className="xl:col-span-4 2xl:col-span-3">
            <FamilyProfileCard family={family} />
          </div>

          <div className="space-y-6 xl:col-span-8 2xl:col-span-9">
            <FamilyOverviewCard family={family} />
          </div>
        </div>

        <FamilyPaymentSummaryCard
          summary={family.paymentSummary}
          currentFee={family.currentFee}
        />

        <CurrentFeeCard
          familyId={family.id}
          onChangeFee={(feeId) => () => {
            setSelectedFeeId(feeId ?? "")
            setEditOpen(true)
          }}
        />

        <FamilyPaymentHistory familyId={family.id} />

        <FeeHistoryCard
          familyId={family.id}
          onCreateFee={() => setCreateOpen(true)}
          onEditFee={(feeId) => {
            setSelectedFeeId(feeId ?? "")
            setEditOpen(true)
          }}
        />
      </div>

      {/* Create Fee */}
      <CreateFamilyFeeDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        form={createFee.form}
        isSubmitting={createFee.isSubmitting}
        onSubmit={createFee.handleSubmit}
      />

      {/* Edit Fee */}
      <EditFamilyFeeDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        form={editFee.form}
        isSubmitting={editFee.isSubmitting}
        onSubmit={editFee.handleSubmit}
      />
    </>
  )
}
