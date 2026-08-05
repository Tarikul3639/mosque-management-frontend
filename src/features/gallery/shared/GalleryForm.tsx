// src/features/gallery/shared/GalleryForm.tsx

"use client"

import { format } from "date-fns"
import { FileText, Hash, ImageIcon } from "lucide-react"
import { type UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { GalleryFormValues } from "@/schemas/gallery.schema"
import { UnsavedChangesBar } from "@/components/common/unsaved-changes-bar"

interface GalleryFormProps {
    title: string
    submitText: string
    form: UseFormReturn<GalleryFormValues>
    isSubmitting: boolean
    showMetadata?: boolean
    createdAt?: string
    updatedAt?: string
    onSubmit: (values: GalleryFormValues) => Promise<void>
    onReset?: () => void
}

export function GalleryForm({
    title,
    submitText,
    form,
    isSubmitting,
    showMetadata = false,
    createdAt,
    updatedAt,
    onSubmit,
    onReset,
}: GalleryFormProps) {
    const {
        register,
        formState: { errors, isDirty },
    } = form

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <ImageIcon className="size-4" />
                            Gallery Title
                        </Label>

                        <Input placeholder="Gallery title" {...register("title")} />

                        {errors.title && (
                            <p className="text-xs text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <FileText className="size-4" />
                            Description
                        </Label>

                        <Textarea
                            rows={6}
                            placeholder="Write gallery description..."
                            {...register("description")}
                        />

                        {errors.description && (
                            <p className="text-xs text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Display Order */}
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <Hash className="size-4" />
                            Display Order
                        </Label>

                        <Input
                            type="number"
                            min={1}
                            {...register("order", {
                                valueAsNumber: true,
                            })}
                        />

                        {errors.order && (
                            <p className="text-xs text-destructive">{errors.order.message}</p>
                        )}
                    </div>

                    {showMetadata && (
                        <>
                            {/* Created At */}
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Created At</Label>

                                <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                                    {createdAt
                                        ? format(new Date(createdAt), "dd MMM yyyy, hh:mm a")
                                        : "-"}
                                </div>
                            </div>

                            {/* Updated At */}
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Last Updated</Label>

                                <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                                    {updatedAt
                                        ? format(new Date(updatedAt), "dd MMM yyyy, hh:mm a")
                                        : "-"}
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <UnsavedChangesBar
                isDirty={isDirty}
                isSubmitting={isSubmitting}
                onSubmit={form.handleSubmit(onSubmit)}
                submitText={submitText}
                onReset={onReset}
                position="bottom"
            />
        </form>
    )
}