"use client"

import { format } from "date-fns"
import { CalendarDays, FileImage, FolderKanban } from "lucide-react"
import { useWatch, type UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { PROJECT_STATUS_OPTIONS } from "@/constants/project-status"
import type { ProjectStatus } from "@/constants/project-status"
import type { ProjectFormValues } from "@/schemas/project.schema"
import { ProjectBudgetCard } from "./ProjectBudgetCard"
import { UnsavedChangesBar } from "@/components/common/unsaved-changes-bar"

interface ProjectFormProps {
    title: string
    submitText: string
    form: UseFormReturn<ProjectFormValues>
    isSubmitting: boolean
    showMetadata?: boolean
    createdAt?: string
    updatedAt?: string
    onSubmit: (values: ProjectFormValues) => Promise<void>
    onReset?: () => void
}

export function ProjectForm({
    title,
    submitText,
    form,
    isSubmitting,
    showMetadata = false,
    createdAt,
    updatedAt,
    onSubmit,
    onReset,
}: ProjectFormProps) {
    const {
        register,
        formState: { errors, isDirty },
    } = form

    const status = useWatch({
        control: form.control,
        name: "status",
    })

    const showActionBar = isDirty || !showMetadata

    return (
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <UnsavedChangesBar
                show={showActionBar}
                isSubmitting={isSubmitting}
                submitText={submitText}
                position="bottom"
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={onReset}
            />

            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <FolderKanban className="size-4" />
                            Title
                        </Label>

                        <Input placeholder="Project title" {...register("title")} />

                        {errors.title && (
                            <p className="text-xs text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>

                        <Textarea
                            rows={5}
                            placeholder="Project description"
                            {...register("description")}
                        />

                        {errors.description && (
                            <p className="text-xs text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Status</Label>

                        <Select
                            value={status}
                            onValueChange={(value) =>
                                form.setValue("status", value as ProjectStatus, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>

                            <SelectContent>
                                {PROJECT_STATUS_OPTIONS.map((item) => (
                                    <SelectItem key={item.value} value={item.value}>
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors.status && (
                            <p className="text-xs text-destructive">
                                {errors.status.message}
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <ProjectBudgetCard form={form} />

            <Card>
                <CardHeader>
                    <CardTitle>Timeline & Gallery</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <CalendarDays className="size-4" />
                            Start Date
                        </Label>

                        <Input
                            type="date"
                            value={
                                form.watch("startDate")
                                    ? format(
                                        new Date(form.watch("startDate") ?? ""),
                                        "yyyy-MM-dd"
                                    )
                                    : ""
                            }
                            onChange={(e) =>
                                form.setValue("startDate", e.target.value || "", {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        />

                        {errors.startDate && (
                            <p className="text-xs text-destructive">
                                {errors.startDate.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <CalendarDays className="size-4" />
                            End Date
                        </Label>

                        <Input
                            type="date"
                            value={
                                form.watch("endDate")
                                    ? format(new Date(form.watch("endDate") ?? ""), "yyyy-MM-dd")
                                    : ""
                            }
                            onChange={(e) =>
                                form.setValue("endDate", e.target.value || "", {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        />

                        {errors.endDate && (
                            <p className="text-xs text-destructive">
                                {errors.endDate.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label className="flex items-center gap-2">
                            <FileImage className="size-4" />
                            Images
                        </Label>

                        <Input placeholder="Image upload component" disabled />

                        {errors.imageIds && (
                            <p className="text-xs text-destructive">
                                {errors.imageIds.message}
                            </p>
                        )}
                    </div>

                    {showMetadata && (
                        <>
                            <div className="space-y-2">
                                <Label className="text-muted-foreground">Created At</Label>
                                <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                                    {createdAt
                                        ? format(new Date(createdAt), "dd MMM yyyy, hh:mm a")
                                        : "-"}
                                </div>
                            </div>

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
        </form>
    )
}