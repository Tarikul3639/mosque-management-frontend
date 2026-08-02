"use client"

import type { AnyFieldApi } from "@tanstack/react-form"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { cn } from "@/lib/utils"

interface FormInputProps extends Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange"
> {
  field: AnyFieldApi
  label: string
  required?: boolean
  description?: string
}

export function FormInput({
  field,
  label,
  required,
  description,
  className,
  ...props
}: FormInputProps) {
  const error = field.state.meta.isTouched
    ? field.state.meta.errors[0]
    : undefined

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>
        {label}

        {required && <span className="ml-1 text-destructive">*</span>}
      </Label>

      <Input
        {...props}
        id={field.name}
        name={field.name}
        value={field.state.value ?? ""}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn(
          "h-11",
          error && "border-destructive focus-visible:ring-destructive",
          className
        )}
      />

      {!error && description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {error && <p className="text-sm text-destructive">{String(error)}</p>}
    </div>
  )
}
