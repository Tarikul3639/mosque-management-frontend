// src/features/donations/details/DonationDetailsPage.tsx

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { ErrorComponent } from "@/components/common/error"
import { NotFound } from "@/components/common/not-found"
import { PageLoader } from "@/components/common/page-loader"

import {
  useDeleteDonationMutation,
  useDownloadDonationReceiptMutation,
  useGetDonationQuery,
} from "@/store/api/donation.api"

import { DonationDetailsHeader } from "./components/DonationDetailsHeader"
import { DonationOverviewCard } from "./components/DonationOverviewCard"
import { DonorInformationCard } from "./components/DonorInformationCard"
import { DonationInformationCard } from "./components/DonationInformationCard"
import { DonationTimelineCard } from "./components/DonationTimelineCard"

import { DonationReceiptCard } from "../shared/DonationReceiptCard"
import { DonationReceiptActions } from "../shared/DonationReceiptActions"

interface DonationDetailsPageProps {
  donationId: string
}

export function DonationDetailsPage({ donationId }: DonationDetailsPageProps) {
  const router = useRouter()

  const [isPrinting, setIsPrinting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const {
    data: donation,
    isLoading,
    isError,
    refetch,
  } = useGetDonationQuery(donationId)

  const [downloadReceipt] = useDownloadDonationReceiptMutation()

  const handlePrintReceipt = async () => {
    if (!donation) return

    setIsPrinting(true)

    try {
      const blob = await downloadReceipt(donation.id).unwrap()

      const url = URL.createObjectURL(blob)

      const iframe = document.createElement("iframe")

      iframe.style.position = "fixed"
      iframe.style.right = "0"
      iframe.style.bottom = "0"
      iframe.style.width = "0"
      iframe.style.height = "0"
      iframe.style.border = "0"

      iframe.src = url

      document.body.appendChild(iframe)

      iframe.onload = () => {
        iframe.contentWindow?.focus()
        iframe.contentWindow?.print()

        setTimeout(() => {
          URL.revokeObjectURL(url)
          iframe.remove()
        }, 1000)
      }
    } catch {
      toast.error("Failed to print receipt.")
    } finally {
      setIsPrinting(false)
    }
  }

  const handleDownloadReceipt = async () => {
    if (!donation) return

    setIsDownloading(true)

    try {
      const blob = await downloadReceipt(donation.id).unwrap()

      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")

      link.href = url
      link.download = `${donation.receiptNo}.pdf`

      document.body.appendChild(link)

      link.click()

      link.remove()

      URL.revokeObjectURL(url)

      toast.success("Receipt downloaded successfully.")
    } catch {
      toast.error("Failed to download receipt.")
    } finally {
      setIsDownloading(false)
    }
  }

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <ErrorComponent onRetry={refetch} />
  }

  if (!donation) {
    return (
      <NotFound
        title="Donation not found"
        description="The requested donation does not exist."
      />
    )
  }

  return (
    <div className="space-y-6 px-2 py-4 sm:p-6">
      <DonationDetailsHeader
        donationId={donation.id}
        receiptNo={donation.receiptNo}
      />

      <DonationOverviewCard donation={donation} />

      <div className="grid gap-6 xl:grid-cols-2">
        <DonorInformationCard donation={donation} />

        <DonationInformationCard donation={donation} />
      </div>

      <div className="grid gap-6 xl:grid-cols-12">
        <div className="space-y-6 xl:order-last xl:col-span-5">
          <DonationTimelineCard donation={donation} />
        </div>
        <div className="space-y-6 xl:col-span-7">
          <DonationReceiptCard
            title="Receipt"
            donation={donation}
            donor={donation.donor}
          />

          <DonationReceiptActions
            onDownload={handleDownloadReceipt}
            onPrint={handlePrintReceipt}
            isDownloading={isDownloading}
            isPrinting={isPrinting}
          />
        </div>
      </div>
    </div>
  )
}
