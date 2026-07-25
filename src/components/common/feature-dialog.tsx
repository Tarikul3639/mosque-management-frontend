"use client"

import { Hammer } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { closeFeatureDialog } from "@/store/slices/ui.slice"

export function FeatureDialog() {
  const dispatch = useAppDispatch()

  const { open, title, description } = useAppSelector(
    (state) => state.ui.featureDialog
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          dispatch(closeFeatureDialog())
        }
      }}
    >
      <DialogContent className="rounded-xl p-6 sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Hammer className="h-7 w-7 text-primary" />
          </div>

          <DialogTitle>{title}</DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            className="h-9 w-full rounded-sm text-sm"
            onClick={() => dispatch(closeFeatureDialog())}
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
