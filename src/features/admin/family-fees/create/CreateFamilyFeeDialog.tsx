"use client"

import { Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { FamilyFeeForm } from "../shared/FamilyFeeForm"

import type { UseFormReturn } from "react-hook-form"
import type { FamilyFeeFormValues } from "@/schemas/family-fee.schema"

interface CreateFamilyFeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void

  form: UseFormReturn<FamilyFeeFormValues>

  isSubmitting: boolean

  onSubmit: (values: FamilyFeeFormValues) => Promise<void>
}

export function CreateFamilyFeeDialog({
  open,
  onOpenChange,
  form,
  isSubmitting,
  onSubmit,
}: CreateFamilyFeeDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (isSubmitting) return

        onOpenChange(value)
      }}
    >
      <DialogContent
        className="sm:max-w-lg"
        onInteractOutside={(e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={(e) => {
          if (isSubmitting) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Monthly Fee</DialogTitle>

          <DialogDescription>
            Create a new monthly fee for this family.
          </DialogDescription>
        </DialogHeader>

        <FamilyFeeForm form={form} />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}

            {isSubmitting ? "Saving..." : "Save Fee"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
