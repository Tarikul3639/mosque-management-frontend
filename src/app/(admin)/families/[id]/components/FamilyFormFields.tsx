"use client";

import type { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import type { FamilyFormValues } from "@/schemas/family.schema";

interface FamilyFormFieldsProps {
    form: UseFormReturn<FamilyFormValues>;
}

export function FamilyFormFields({
    form,
}: FamilyFormFieldsProps) {
    const {
        register,
        setValue,
        watch,
        formState: { errors },
    } = form;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
                <Label htmlFor="familyNo">
                    Family Number
                </Label>

                <Input
                    id="familyNo"
                    placeholder="F-0001"
                    {...register("familyNo")}
                />

                {errors.familyNo && (
                    <p className="text-sm text-destructive">
                        {errors.familyNo.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="headName">
                    Head Name
                </Label>

                <Input
                    id="headName"
                    placeholder="Abdul Karim"
                    {...register("headName")}
                />

                {errors.headName && (
                    <p className="text-sm text-destructive">
                        {errors.headName.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="phone">
                    Phone
                </Label>

                <Input
                    id="phone"
                    placeholder="01XXXXXXXXX"
                    {...register("phone")}
                />

                {errors.phone && (
                    <p className="text-sm text-destructive">
                        {errors.phone.message}
                    </p>
                )}
            </div>

            <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <Label>
                            Active Family
                        </Label>

                        <p className="text-sm text-muted-foreground">
                            Enable or disable this family.
                        </p>
                    </div>

                    <Switch
                        checked={watch("isActive")}
                        onCheckedChange={(value) =>
                            setValue("isActive", value)
                        }
                    />
                </div>
            </div>

            <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">
                    Address
                </Label>

                <Textarea
                    id="address"
                    rows={4}
                    placeholder="Family address..."
                    {...register("address")}
                />

                {errors.address && (
                    <p className="text-sm text-destructive">
                        {errors.address.message}
                    </p>
                )}
            </div>
        </div>
    );
}