"use client"

// src/features/donations/shared/DonationReceiptActions.tsx
import { Download, Loader2, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"

interface DonationReceiptActionsProps {
  onDownload?: () => void
  onPrint?: () => void

  isDownloading?: boolean
  isPrinting?: boolean

  className?: string
}

export function DonationReceiptActions({
  onDownload,
  onPrint,
  isDownloading = false,
  isPrinting = false,
  className,
}: DonationReceiptActionsProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          className="flex-1"
          onClick={onDownload}
          disabled={isDownloading || isPrinting}
        >
          {isDownloading ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Download className="mr-2 size-4" />
          )}

          {isDownloading ? "Downloading..." : "Download Receipt"}
        </Button>

        <Button
          variant="outline"
          className="flex-1"
          onClick={onPrint}
          disabled={isDownloading || isPrinting}
        >
          {isPrinting ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <Printer className="mr-2 size-4" />
          )}

          {isPrinting ? "Generating..." : "Print Receipt"}
        </Button>
      </div>
    </div>
  )
}
