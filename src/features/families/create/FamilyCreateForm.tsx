"use client"

import { Loader2, MapPin, Phone, ShieldCheck, User } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import type { FamilyFormValues } from "@/schemas/family.schema"

interface FamilyCreateFormProps {
    form: UseFormReturn<FamilyFormValues>
    onSubmit: (values: FamilyFormValues) => Promise<void>
    isSubmitting: boolean
}

export function FamilyCreateForm({
    form,
    onSubmit,
    isSubmitting,
}: FamilyCreateFormProps) {
    const {
        formState: { isDirty },
    } = form

    return (
        <Card>
            <CardHeader className="border-b">
                <CardTitle>Family Information</CardTitle>

                <CardDescription>
                    Enter the family's basic details and configure its status.
                </CardDescription>
            </CardHeader>

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-8 pt-6">
                    {/* Basic Information */}
                    <section className="space-y-5">
                        <div>
                            <h3 className="text-sm font-semibold">Basic Information</h3>

                            <p className="text-sm text-muted-foreground">
                                Provide the family's primary information.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">
                            <FormField icon={<User className="size-4" />} label="Head Name">
                                <Input
                                    className="py-5"
                                    placeholder="Enter head name"
                                    {...form.register("headName")}
                                />
                            </FormField>

                            <FormField
                                icon={<Phone className="size-4" />}
                                label="Phone Number"
                            >
                                <Input
                                    className="py-5"
                                    placeholder="Enter phone number"
                                    {...form.register("phone")}
                                />
                            </FormField>

                            <div className="md:col-span-2">
                                <FormField icon={<MapPin className="size-4" />} label="Address">
                                    <Input
                                        className="py-5"
                                        placeholder="Enter family address"
                                        {...form.register("address")}
                                    />
                                </FormField>
                            </div>
                        </div>
                    </section>

                    {/* Status */}
                    <section className="space-y-5">
                        <div>
                            <h3 className="text-sm font-semibold">Status</h3>

                            <p className="text-sm text-muted-foreground">
                                Choose whether this family is active.
                            </p>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-4 mb-5">
                            <div className="flex items-start gap-3">
                                <div className="flex size-10 items-center justify-center rounded-md border bg-background">
                                    <ShieldCheck className="size-5 text-primary" />
                                </div>

                                <div>
                                    <p className="font-medium">Active Family</p>

                                    <p className="text-sm text-muted-foreground">
                                        Active families can make payments and appear in reports.
                                    </p>
                                </div>
                            </div>

                            <Switch
                                checked={form.watch("isActive")}
                                onCheckedChange={(checked) =>
                                    form.setValue("isActive", checked, {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    })
                                }
                            />
                        </div>
                    </section>
                </CardContent>

                <CardFooter className="flex justify-end gap-3 border-t">
                    {isDirty && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => form.reset()}
                        >
                            Reset
                        </Button>
                    )}

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
                        Create Family
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

interface FormFieldProps {
    icon: React.ReactNode
    label: string
    children: React.ReactNode
}

function FormField({ icon, label, children }: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label className="flex items-center gap-3 text-sm font-medium">
                <span className="flex size-9 items-center justify-center rounded-md border bg-muted">
                    {icon}
                </span>

                {label}
            </Label>

            {children}
        </div>
    )
}
