"use client"

import * as React from "react"
import { Camera, Trash2 } from "lucide-react"

import { cn } from "@/lib/utils"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

interface FormAvatarUploadProps {
  src?: string | null
  initials: string
  disabled?: boolean
  onSelect(file: File): void
  onRemove?(): void
}

export function FormAvatarUpload({
  src,
  initials,
  disabled,
  onSelect,
  onRemove,
}: FormAvatarUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    onSelect(file)

    e.target.value = ""
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleChange}
      />

      <div className="relative">
        <Avatar className="size-36 border">
          <AvatarImage src={src ?? undefined} />

          <AvatarFallback className="text-3xl font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-full",
            "bg-black/50 opacity-0 transition-opacity",
            "hover:opacity-100"
          )}
        >
          <Camera className="size-7 text-white" />
        </button>

        {src && onRemove && (
          <Button
            size="icon"
            type="button"
            variant="destructive"
            className="absolute -top-2 -right-2 size-8 rounded-full"
            onClick={onRemove}
          >
            <Trash2 className="size-4" />
          </Button>
        )}
      </div>

      <div className="space-y-1 text-center">
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={disabled}
        >
          <Camera className="size-4" />
          Upload Photo
        </Button>

        <p className="text-xs text-muted-foreground">
          PNG, JPG or WEBP
          <br />
          Max size 2 MB
        </p>
      </div>
    </div>
  )
}
