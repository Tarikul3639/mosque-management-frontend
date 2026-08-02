"use client"

import { useEffect, useRef, useState } from "react"

import type { Area } from "react-easy-crop"

import { Camera, Check, Loader2 } from "lucide-react"

import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { AvatarProgress } from "./avatar-progress"
import { AvatarCropDialog } from "./avatar-crop-dialog"

import { getCroppedFile } from "@/utils/image/crop-image"

import { cn } from "@/lib/utils"
import { getAvatarClass, getAvatarInitials } from "@/utils/avatar.utils"

interface AvatarUploadProps {
  name: string
  image?: string | null
  disabled?: boolean
  progress?: number
  uploading?: boolean
  completed?: boolean
  isEditable?: boolean
  onChange?: (file: File) => void | Promise<void>
}

export function AvatarUpload({
  name,
  image,
  disabled = false,
  progress = 0,
  uploading = false,
  completed = false,
  isEditable = false,

  onChange,
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState(image ?? "")
  const [cropOpen, setCropOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    setPreview(image ?? "")
  }, [image])

  useEffect(() => {
    return () => {
      if (selectedImage && selectedImage.startsWith("blob:")) {
        URL.revokeObjectURL(selectedImage)
      }
    }
  }, [selectedImage])

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  const openPicker = () => {
    if (disabled || uploading || !isEditable) return

    inputRef.current?.click()
  }
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      toast.error("Only JPG, JPEG and PNG are allowed.")
      event.target.value = ""
      return
    }

    if (file.size > 3 * 1024 * 1024) {
      toast.error("Maximum file size is 3 MB.")
      event.target.value = ""
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setSelectedImage(objectUrl)
    setCropOpen(true)
    event.target.value = ""
  }

  const handleCropSave = async (croppedAreaPixels: Area, rotation: number) => {
    try {
      const file = await getCroppedFile(
        selectedImage,
        croppedAreaPixels,
        rotation
      )

      const previewUrl = URL.createObjectURL(file)

      setPreview(previewUrl)

      // Close the crop dialog
      setCropOpen(false)

      // Start uploading the cropped image
      await onChange?.(file)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to crop image."
      )
    }
  }
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="group relative">
          <AvatarProgress
            progress={progress}
            strokeWidth={progress >= 0 ? 6 : 4}
            className={cn(
              uploading && "text-primary",
              completed && "text-success"
            )}
          />

          <div className="rounded-full border-4 border-background bg-background p-1 shadow-lg">
            <Avatar className="size-32">
              <AvatarImage src={preview} alt={name} />

              <AvatarFallback className={cn("text-3xl", getAvatarClass(name))}>
                {getAvatarInitials(name)}
              </AvatarFallback>
            </Avatar>
          </div>
          {isEditable && (
            <div
              className={cn(
                "absolute inset-2 flex items-center justify-center rounded-full bg-background/70 backdrop-blur-[2px] transition-opacity",
                !disabled && !uploading && "opacity-0 group-hover:opacity-100",
                uploading && "opacity-100"
              )}
            >
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="size-12 rounded-full shadow-sm"
                onClick={openPicker}
                disabled={disabled || uploading}
              >
                {uploading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : completed ? (
                  <Check className="size-5 text-success" />
                ) : (
                  <Camera className="size-5" />
                )}
              </Button>
            </div>
          )}

          {uploading && (
            <div className="absolute inset-2 z-20 flex items-center justify-center rounded-full bg-primary/70 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow">
                  {progress}%
                </span>
              </div>
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          hidden
          disabled={disabled || uploading || !isEditable}
          type="file"
          accept=".jpg,.jpeg,.png,image/png,image/jpeg"
          onChange={handleFile}
        />

        <p className="mt-3 text-center text-xs text-muted-foreground">
          JPG, JPEG, PNG
          <br />
          Maximum size 3 MB
        </p>
      </div>

      <AvatarCropDialog
        open={cropOpen}
        image={selectedImage}
        loading={uploading}
        onClose={() => {
          setCropOpen(false)

          if (selectedImage.startsWith("blob:")) {
            URL.revokeObjectURL(selectedImage)
          }

          setSelectedImage("")
        }}
        onSave={handleCropSave}
      />
    </>
  )
}
