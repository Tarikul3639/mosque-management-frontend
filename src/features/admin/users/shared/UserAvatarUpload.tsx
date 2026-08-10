"use client"

// src/features/user/shared/UserAvatarUpload.tsx
import { AvatarUpload } from "@/components/common/avatar-upload/avatar-upload"
import { Card } from "@/components/ui/card"

interface UserAvatarUploadProps {
  name: string

  image?: string | null

  uploading?: boolean
  progress?: number
  completed?: boolean

  isEditable?: boolean

  onUpload?: (file: File) => Promise<void> | void
}

export function UserAvatarUpload({
  name,
  image,

  uploading = false,
  progress = 0,
  completed = false,

  isEditable = true,

  onUpload,
}: UserAvatarUploadProps) {
  return (
    <Card className="relative overflow-hidden rounded-2xl py-0">
      {/* Cover */}
      <div className="h-24 bg-linear-to-r from-primary via-primary/70 to-primary" />

      <div className="relative -mt-16 flex flex-col items-center gap-4 px-6 pb-8">
        <AvatarUpload
          name={name}
          image={image}
          uploading={uploading}
          progress={progress}
          completed={completed}
          isEditable={isEditable}
          onChange={onUpload}
        />

        <div className="space-y-1 text-center">
          <h3 className="text-sm font-semibold">Profile Photo</h3>

          <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
            Upload a square profile photo.
            <br />
            Supported formats: JPG, JPEG, PNG.
            <br />
            Maximum file size: 3 MB.
          </p>
        </div>
      </div>
    </Card>
  )
}
