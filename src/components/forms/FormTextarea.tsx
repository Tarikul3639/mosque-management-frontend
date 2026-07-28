"use client";

import type { AnyFieldApi } from "@tanstack/react-form";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

interface FormTextareaProps
    extends Omit<
        React.ComponentProps<typeof Textarea>,
        "value" | "onChange"
    > {
    field: AnyFieldApi;
    label: string;
    required?: boolean;
    description?: string;
}

export function FormTextarea({
    field,
    label,
    required,
    description,
    className,
    ...props
}: FormTextareaProps) {
    const error = field.state.meta.isTouched
        ? field.state.meta.errors[0]
        : undefined;

    return (
        <div className="space-y-2">
            <Label htmlFor={field.name}>
                {label}

                {required && (
                    <span className="ml-1 text-destructive">*</span>
                )}
            </Label>

            <Textarea
                {...props}
                id={field.name}
                name={field.name}
                value={field.state.value ?? ""}
                onBlur={field.handleBlur}
                onChange={(e) =>
                    field.handleChange(e.target.value)
                }
                className={cn(
                    "min-h-24 resize-y",
                    error &&
                    "border-destructive focus-visible:ring-destructive",
                    className
                )}
            />

            {!error && description && (
                <p className="text-xs text-muted-foreground">
                    {description}
                </p>
            )}

            {error && (
                <p className="text-sm text-destructive">
                    {String(error)}
                </p>
            )}
        </div>
    );
}