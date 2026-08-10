"use client"

// src/features/payments/receipt/components/PaymentReceiptActions.tsx
import { Download, Loader2, Printer } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

interface PaymentReceiptActionsProps {
  isPrinting?: boolean
  isDownloading?: boolean

  onPrint: () => void
  onDownload: () => void
}

export function PaymentReceiptActions({
  isPrinting = false,
  isDownloading = false,
  onPrint,
  onDownload,
}: PaymentReceiptActionsProps) {
  const isLoading = isPrinting || isDownloading

  return (
    <Card>
      <CardHeader>
        <CardTitle>Receipt Actions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-row gap-3">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={onPrint}
            className="flex-1"
          >
            {isPrinting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Printer className="mr-2 size-4" />
                Print
              </>
            )}
          </Button>

          <Button disabled={isLoading} onClick={onDownload} className="flex-1">
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 size-4" />
                Download
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
