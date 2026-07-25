"use client"

import React, { useState } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

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
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="group relative">
        <Lock
          className={`absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-has-[input:focus]:text-primary ${error ? "text-destructive!" : ""}`}
        />

        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`h-10 pr-12 pl-12 ${
            error && "border-destructive focus-visible:ring-destructive"
          }`}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      <InputError message={error} />
    </div>
  )
}
