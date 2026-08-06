"use client"

import { Loader2 } from "lucide-react"
import type { UseFormReturn } from "react-hook-form"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { PrayerTimeForm } from "./PrayerTimeForm"

import type { PrayerTimeFormValues } from "@/schemas/prayer-time.schema"

interface PrayerTimeEditDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    form: UseFormReturn<PrayerTimeFormValues>
    isSubmitting: boolean
    onSubmit: (values: PrayerTimeFormValues) => Promise<void>
    onReset: () => void
}

const FORM_ID = "prayer-time-form"

export function PrayerTimeEditDialog({
    open,
    onOpenChange,
    form,
    isSubmitting,
    onSubmit,
    onReset,
}: PrayerTimeEditDialogProps) {
    const {
        formState: { isDirty },
    } = form

    const handleCancel = () => {
        onReset()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
                <DialogHeader className="border-b px-6 py-8">
                    <DialogTitle>Edit Prayer Times</DialogTitle>

                    <DialogDescription>
                        Update the mosque&apos;s daily prayer schedule. Changes will
                        be reflected immediately after saving.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 py-6">
                    <PrayerTimeForm form={form} onSubmit={onSubmit} formId={FORM_ID} />
                </div>

                <DialogFooter className="border-t bg-muted/30 px-6 py-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button type="submit" form={FORM_ID} disabled={!isDirty || isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-0.5 size-4 animate-spin" />}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}