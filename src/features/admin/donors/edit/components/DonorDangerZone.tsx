"use client"

import { ROUTES } from "@/config/routes"
import { useState } from "react"
import { Trash2 } from "lucide-react"

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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import type { Donor } from "@/types/donor"
import { useDeleteDonorMutation } from "@/store/api/donor.api"
import { getErrorMessage } from "@/utils/get-error-message"

interface DonorDangerZoneProps {
  donor: Donor
}

export function DonorDangerZone({ donor }: DonorDangerZoneProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [deleteDonor, { isLoading }] = useDeleteDonorMutation()

  const handleDelete = async () => {
    try {
      const response = await deleteDonor(donor.id).unwrap()
      toast.success(response.message || "Donor deleted successfully")
      router.push(ROUTES.ADMIN.DONORS.INDEX)
    } catch (error) {
      toast.error(getErrorMessage(error) || "Failed to delete donor")
    }
  }

  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>

        <CardDescription>
          Permanently delete this donor. This action cannot be undone.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium">Delete donor</p>

          <p className="text-sm text-muted-foreground">
            All donor information will be permanently removed.
          </p>
        </div>

        <Button
          variant="destructive"
          disabled={isLoading}
          onClick={() => setIsOpen(true)}
        >
          <Trash2 className="size-4" />
          Delete Donor
        </Button>
      </CardContent>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>

            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              donor and remove all associated data.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>

            <Button
              variant="destructive"
              disabled={isLoading}
              onClick={handleDelete}
            >
              {isLoading ? "Deleting..." : "Delete Donor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
