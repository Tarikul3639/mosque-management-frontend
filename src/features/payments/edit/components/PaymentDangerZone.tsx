// src/features/payments/edit/components/PaymentDangerZone.tsx

"use client"

import { useState } from "react"
import { AlertTriangle, Loader2, Trash2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface PaymentDangerZoneProps {
  isDeleting: boolean
  onDelete: () => void | Promise<void>
}

export function PaymentDangerZone({
  isDeleting,
  onDelete,
}: PaymentDangerZoneProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    await onDelete()
    setOpen(false)
  }

  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <div className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="size-5" />

          <CardTitle>Danger Zone</CardTitle>
        </div>

        <CardDescription>
          Deleting this payment is permanent. This action cannot be undone.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <h4 className="font-medium text-destructive">Delete Payment</h4>

          <p className="mt-2 text-sm text-muted-foreground">
            Once deleted, the payment record will be permanently removed. Any
            related monthly charge totals may also be affected.
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Trash2 className="mr-2 size-4" />
              Delete Payment
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                payment record and adjust the corresponding monthly charge
                totals.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>

              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Yes, Delete"
                )}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}
