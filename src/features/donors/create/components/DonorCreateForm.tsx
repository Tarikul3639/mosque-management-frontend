"use client";

import { format } from "date-fns";
import {
    CalendarDays,
    Loader2,
    Mail,
    MapPin,
    Phone,
    User,
} from "lucide-react";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import type { DonorFormValues } from "@/schemas/donor.schema";

interface DonorCreateFormProps {
    title: string;
    form: UseFormReturn<DonorFormValues>;
    onSubmit: (values: DonorFormValues) => Promise<void>;
    isSubmitting: boolean;

    createdAt?: string;
    updatedAt?: string;
}

export function DonorCreateForm({
    title,
    form,
    onSubmit,
    isSubmitting,
    createdAt,
    updatedAt,
}: DonorCreateFormProps) {
    const {
        formState: { isDirty },
    } = form;

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <FormField
                            icon={<User className="size-4" />}
                            label="Full Name"
                        >
                            <Input className="py-5" {...form.register("name")} placeholder="Enter full name" />
                        </FormField>

                        <FormField
                            icon={<Phone className="size-4" />}
                            label="Phone Number"
                        >
                            <Input className="py-5" {...form.register("phone")} placeholder="Enter phone number" />
                        </FormField>

                        <FormField
                            icon={<Mail className="size-4" />}
                            label="Email Address"
                        >
                            <Input
                                className="py-5"
                                type="email"
                                {...form.register("email")}
                                placeholder="Enter email address"
                            />
                        </FormField>

                        <div className="space-y-3">
                            <Label>Status</Label>

                            <div className="flex h-10 items-center justify-between rounded-md border px-3">
                                <span className="text-sm">Active Donor</span>

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
                        </div>

                        <div className="md:col-span-2">
                            <FormField
                                icon={<MapPin className="size-4" />}
                                label="Address"
                            >
                                <Textarea
                                    rows={4}
                                    {...form.register("address")}
                                    placeholder="Enter donor address"
                                />
                            </FormField>
                        </div>
                    </div>

                    {(createdAt || updatedAt) && (
                        <div className="grid gap-5 border-t pt-6 md:grid-cols-2">
                            {createdAt && (
                                <ReadOnlyField
                                    icon={<CalendarDays className="size-4" />}
                                    label="Created At"
                                    value={format(
                                        new Date(createdAt),
                                        "dd MMM yyyy, hh:mm a",
                                    )}
                                />
                            )}

                            {updatedAt && (
                                <ReadOnlyField
                                    icon={<CalendarDays className="size-4" />}
                                    label="Last Updated"
                                    value={format(
                                        new Date(updatedAt),
                                        "dd MMM yyyy, hh:mm a",
                                    )}
                                />
                            )}
                        </div>
                    )}

                    {isDirty && (
                        <div className="flex justify-end gap-3 border-t pt-6">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => form.reset()}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting && (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                )}

                                Save Changes
                            </Button>
                        </div>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}

interface FormFieldProps {
    icon: ReactNode;
    label: string;
    children: ReactNode;
}

function FormField({
    icon,
    label,
    children,
}: FormFieldProps) {
    return (
        <div className="space-y-2">
            <Label className="flex items-center gap-2">
                {icon}
                {label}
            </Label>

            {children}
        </div>
    );
}

interface ReadOnlyFieldProps {
    icon: ReactNode;
    label: string;
    value: ReactNode;
}

function ReadOnlyField({
    icon,
    label,
    value,
}: ReadOnlyFieldProps) {
    return (
        <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
                {icon}
                {label}
            </Label>

            <div className="rounded-md border bg-muted/40 px-3 py-2 text-sm">
                {value}
            </div>
        </div>
    );
}