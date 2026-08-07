// src/features/payments/edit/PaymentEditPage.tsx

"use client"

import { ErrorComponent } from "@/components/common/error"

import { getErrorMessage } from "@/utils/get-error-message"

import { PaymentEditForm } from "./components/PaymentEditForm"
import { PaymentDangerZone } from "./components/PaymentDangerZone"
import { PaymentEditHeader } from "./components/PaymentEditHeader"
import { PaymentEditSkeleton } from "./components/PaymentEditSkeleton"

import { usePaymentEdit } from "./usePaymentEdit"

interface PaymentEditPageProps {
  id: string
}

export function PaymentEditPage({ id }: PaymentEditPageProps) {
  const {
    payment,
    paymentQuery,

    form,

    handleSubmit,
    handleDelete,

    isSubmitting,
    isDeleting,
  } = usePaymentEdit({
    id,
  })

  if (paymentQuery.isLoading) {
    return <PaymentEditSkeleton />
  }

  if (paymentQuery.isError) {
    return (
      <ErrorComponent
        title="Failed to load payment."
        error={getErrorMessage(paymentQuery.error)}
        onRetry={paymentQuery.refetch}
      />
    )
  }

  if (!payment) {
    return null
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <PaymentEditHeader
        paymentId={payment.id}
        familyNo={payment.familyNo}
        month={payment.month}
        year={payment.year}
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <PaymentEditForm
            form={form}
            payment={payment}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onCancel={() => form.reset()}
          />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <PaymentDangerZone isDeleting={isDeleting} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  )
}
