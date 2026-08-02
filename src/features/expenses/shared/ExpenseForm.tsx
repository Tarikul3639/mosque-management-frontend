// src/features/expenses/shared/ExpenseForm.tsx

"use client"

import { format } from "date-fns"
import { CalendarDays, Loader2, ReceiptText, Tag, Wallet } from "lucide-react"

import { useWatch, type UseFormReturn } from "react-hook-form"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
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

import { EXPENSE_CATEGORY_OPTIONS } from "@/constants/expense-categories"

import type { ExpenseFormValues } from "@/schemas/expense.schema"
import type { ExpenseCategory } from "@/types/expense"

interface ExpenseFormProps {
    title: string
    submitText: string

    form: UseFormReturn<ExpenseFormValues>

    isSubmitting: boolean

    showMetadata?: boolean

    createdAt?: string
    updatedAt?: string

    onSubmit: (values: ExpenseFormValues) => Promise<void>

    onCancel?: () => void
}

export function ExpenseForm({
    title,
    submitText,

    form,

    isSubmitting,

    showMetadata = false,

    createdAt,
    updatedAt,

    onSubmit,
    onCancel,
}: ExpenseFormProps) {
    const {
        formState: { isDirty },
    } = form

    const categoryOptions = EXPENSE_CATEGORY_OPTIONS.map((option) => ({
        value: option.value,
        label: option.label,
    }))

    const category = useWatch({
        control: form.control,
        name: "category",
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-5 md:grid-cols-2">
                        {/* Title */}
                        <div className="space-y-2 md:col-span-2">
                            <Label className="flex items-center gap-2">
                                <ReceiptText className="size-4" />
                                Title
                            </Label>

                            <Input placeholder="Expense title" {...form.register("title")} />
                        </div>

                        {/* Amount */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Wallet className="size-4" />
                                Amount
                            </Label>

                            <Input
                                type="number"
                                min={1}
                                {...form.register("amount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <Tag className="size-4" />
                                Category
                            </Label>

                            <Select
                                value={category}
                                onValueChange={(value) =>
                                    form.setValue("category", value as ExpenseCategory, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {categoryOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Expense Date */}
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2">
                                <CalendarDays className="size-4" />
                                Expense Date
                            </Label>

                            <Input
                                type="datetime-local"
                                value={format(
                                    new Date(form.watch("expenseDate")),
                                    "yyyy-MM-dd'T'HH:mm"
                                )}
                                onChange={(e) =>
                                    form.setValue(
                                        "expenseDate",
                                        new Date(e.target.value).toISOString(),
                                        {
                                            shouldDirty: true,
                                            shouldValidate: true,
                                        }
                                    )
                                }
                            />
                        </div>

                        {/* Note */}
                        <div className="space-y-2 md:col-span-2">
                            <Label>Note</Label>

                            <Textarea
                                rows={5}
                                placeholder="Write a note..."
                                {...form.register("note")}
                            />
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
                    </div>

                    {(isDirty || !showMetadata) && (
                        <div className="flex justify-end gap-3 border-t pt-6">
                            {onCancel && (
                                <Button type="button" variant="outline" onClick={onCancel}>
                                    Cancel
                                </Button>
                            )}

                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                )}

                                {submitText}
                            </Button>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}
