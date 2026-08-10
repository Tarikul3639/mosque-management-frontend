"use client"

import { useState } from "react"
import { ErrorComponent } from "@/components/common/error"
import { getErrorMessage } from "@/utils/get-error-message"
import {
  useGetPaymentQuery,
  useLazyGetPaymentReceiptQuery,
} from "@/store/api/payment.api"

import { PaymentDetailsHeader } from "./components/PaymentDetailsHeader"
import { PaymentDetailsSkeleton } from "./components/PaymentDetailsSkeleton"
import { PaymentInformationCard } from "./components/PaymentInformationCard"
import { PaymentTimelineCard } from "./components/PaymentTimelineCard"
import { PaymentReceiptActions } from "./components/PaymentReceiptActions"

interface PaymentDetailsPageProps {
  id: string
}

export function PaymentDetailsPage({ id }: PaymentDetailsPageProps) {
  const [isPrinting, setIsPrinting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const {
    data: payment,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPaymentQuery(id)

  const [triggerGetReceipt] = useLazyGetPaymentReceiptQuery()

  if (isLoading) {
    return <PaymentDetailsSkeleton />
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to load payment."
        error={getErrorMessage(error)}
        onRetry={refetch}
      />
    )
  }

  if (!payment) {
    return null
  }

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      const blob = await triggerGetReceipt(id).unwrap()

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `Receipt-${payment.id}.pdf`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to download receipt:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handlePrint = async () => {
    try {
      setIsPrinting(true)
      const blob = await triggerGetReceipt(id).unwrap()

      const url = window.URL.createObjectURL(blob)
      const iframe = document.createElement("iframe")
      iframe.style.display = "none"
      iframe.src = url
      document.body.appendChild(iframe)

      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow?.print()
        }, 100)
      }
    } catch (error) {
      console.error("Failed to print receipt:", error)
    } finally {
      setIsPrinting(false)
    }
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <PaymentDetailsHeader
        id={payment.id}
        familyNo={payment.familyNo}
        month={payment.month}
        year={payment.year}
      />

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <PaymentInformationCard payment={payment} />
        </div>

        <div className="space-y-6 xl:col-span-4">
          <PaymentTimelineCard
            paidAt={payment.paidAt.toString()}
            createdAt={payment.createdAt.toString()}
            updatedAt={payment.updatedAt.toString()}
          />
          <PaymentReceiptActions
            isPrinting={isPrinting}
            isDownloading={isDownloading}
            onPrint={handlePrint}
            onDownload={handleDownload}
          />
        </div>
      </div>
    </div>
  )
}
