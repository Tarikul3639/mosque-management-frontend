// src/features/donations/details/components/DonationDangerZone.tsx

"use client"

import { Loader2, Trash2 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DonationDangerZoneProps {
  isDeleting?: boolean
  onDelete: () => void
}

export function DonationDangerZone({
  isDeleting = false,
  onDelete,
}: DonationDangerZoneProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>

        <CardDescription>
          Permanently delete this donation and its associated records. This
          action cannot be undone.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="font-medium">Delete Donation</h4>

          <p className="mt-1 text-sm text-muted-foreground">
            Once deleted, this donation cannot be recovered.
          </p>
        </div>

        <Button
          variant="destructive"
          onClick={() => setIsDialogOpen(true)}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Deleting...
            </>
          ) : (
            <>
              <Trash2 className="mr-2 size-4" />
              Delete Donation
            </>
          )}
        </Button>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">
              Confirm Deletion
            </DialogTitle>

            <DialogDescription>
              Are you sure you want to delete this donation? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                onDelete()
              }}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Donation"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
