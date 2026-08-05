"use client"

import { ImagePlus } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ImageEmptyProps {
  title?: string
  description?: string
  uploading?: boolean
  onUpload?: () => void
}

export function ImageEmpty({
  title = "No images uploaded",
  description = "Upload images to build your gallery.",
  uploading,
  onUpload,
}: ImageEmptyProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center gap-4 rounded-xl border border-dashed">
      <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
        <ImagePlus className="size-8 text-primary" />
      </div>

      <div className="space-y-1 text-center">
        <h3 className="font-semibold">{title}</h3>

        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>

      <Button type="button" onClick={onUpload} disabled={uploading}>
        <ImagePlus className="mr-2 size-4" />
        Upload Images
      </Button>
    </div>
  )
}
