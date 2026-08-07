"use client"

import * as React from "react"
import { Mail } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import InputError from "./input-error"

interface EmailInputProps extends React.ComponentProps<"input"> {
  label?: string
  error?: string
}

export default function EmailInput({
  id = "email",
  label = "Email Address",
  error,
  className,
  ...props
}: EmailInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="group relative">
        <Mail
          className={cn(
            "pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200",
            "group-has-[input:focus]:text-primary",
            error && "text-destructive"
          )}
        />

        <Input
          id={id}
          type="email"
          aria-invalid={!!error}
          className={cn(
            "h-10 pl-12",
            error &&
              "border-destructive ring-destructive/20 focus-visible:border-destructive focus-visible:ring-destructive/30",
            className
          )}
          {...props}
        />
      </div>

      <InputError message={error} />
    </div>
  )
}
