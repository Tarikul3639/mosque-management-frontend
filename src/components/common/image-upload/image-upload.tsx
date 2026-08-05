"use client"

import { useRef } from "react"
import { ImagePlus } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import { ImageCard } from "./image-card"
import { ImageDropzone } from "./image-dropzone"
import { ImageEmpty } from "./image-empty"

import type { UploadImage } from "./types"

interface ImageUploadProps {
    images: UploadImage[]
    uploading?: boolean
    multiple?: boolean
    removable?: boolean
    maxFiles?: number
    maxSize?: number
    accept?: string
    title?: string
    description?: string
    onUpload?: (files: File[]) => Promise<void> | void
    onRemove?: (id: string) => void
    onRetry?: (id: string) => void
}

export function ImageUpload({
    images,
    uploading,
    multiple = true,
    removable = true,
    maxFiles = 10,
    maxSize = 5,
    accept = "image/jpeg,image/png,image/webp",
    title = "Project Images",
    description = "Upload project gallery images.",
    onUpload,
    onRemove,
    onRetry,
}: ImageUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null)

    const openPicker = () => {
        if (uploading) return
        inputRef.current?.click()
    }

    const validateFiles = (files: File[]) => {
        if (!files.length) {
            return false
        }

        if (images.length + files.length > maxFiles) {
            toast.error(`Maximum ${maxFiles} images are allowed.`)
            return false
        }

        for (const file of files) {
            if (!file.type.startsWith("image/")) {
                toast.error(`${file.name} is not a valid image.`)
                return false
            }

            if (file.size > maxSize * 1024 * 1024) {
                toast.error(
                    `${file.name} exceeds ${maxSize} MB size limit.`
                )
                return false
            }
        }

        return true
    }

    async function handleFiles(files: File[]) {
        if (!validateFiles(files)) {
            return
        }

        try {
            await onUpload?.(files)
        } catch {
            toast.error("Image upload failed.")
        }
    }

    async function handleInput(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const files = Array.from(event.target.files ?? [])
        await handleFiles(files)
        event.target.value = ""
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold">{title}</h3>
                    <p className="text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={openPicker}
                    disabled={uploading || images.length >= maxFiles}
                >
                    <ImagePlus className="mr-2 size-4" />
                    Upload
                </Button>
            </div>

            <ImageDropzone
                disabled={uploading}
                onFiles={handleFiles}
            >
                {images.length === 0 ? (
                    <ImageEmpty
                        uploading={uploading}
                        onUpload={openPicker}
                    />
                ) : (
                    <div className="grid grid-cols-2 gap-4 rounded-xl border bg-muted/20 p-4 md:grid-cols-3 xl:grid-cols-4">
                        {images.map((image) => (
                            <ImageCard
                                key={image.id}
                                image={image}
                                removable={removable}
                                onRemove={onRemove}
                                onRetry={onRetry}
                            />
                        ))}

                        {images.length < maxFiles && (
                            <button
                                type="button"
                                onClick={openPicker}
                                disabled={uploading}
                                className="flex aspect-square flex-col items-center justify-center rounded-xl border border-dashed bg-background transition hover:border-primary hover:bg-primary/5 disabled:pointer-events-none disabled:opacity-50"
                            >
                                <ImagePlus className="mb-2 size-8 text-muted-foreground" />
                                <span className="text-xs font-medium text-muted-foreground">
                                    Add Image
                                </span>
                            </button>
                        )}
                    </div>
                )}
            </ImageDropzone>

            <input
                ref={inputRef}
                hidden
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={uploading}
                onChange={handleInput}
            />

            <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                    {images.length} / {maxFiles} images
                </span>

                <span>
                    Maximum {maxSize} MB per image
                </span>
            </div>
        </div>
    )
}