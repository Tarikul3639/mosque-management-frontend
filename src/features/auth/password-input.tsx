"use client"

import * as React from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import InputError from "./input-error"

interface PasswordInputProps extends React.ComponentProps<"input"> {
  id?: string
  label?: string
  placeholder?: string
  error?: string
}

export default function PasswordInput({
  id = "password",
  label = "Password",
  placeholder = "Enter your password",
  error,
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="group relative">
        <Lock
          className={cn(
            "pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200",
            "group-has-[input:focus]:text-primary",
            error && "text-destructive"
          )}
        />

        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={cn(
            "h-10 pr-12 pl-12",
            error &&
              "border-destructive ring-destructive/20 focus-visible:border-destructive focus-visible:ring-destructive/30",
            className
          )}
          {...props}
        />

        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none"
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>

      <InputError message={error} />
    </div>
  )
}
