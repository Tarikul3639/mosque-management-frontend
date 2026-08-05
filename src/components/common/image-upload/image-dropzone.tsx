"use client"

import { UploadCloud } from "lucide-react"
import { useDropzone } from "react-dropzone"

import { cn } from "@/lib/utils"

interface ImageDropzoneProps {
    disabled?: boolean
    children: React.ReactNode
    onFiles: (files: File[]) => void | Promise<void>
}

export function ImageDropzone({
    disabled = false,
    children,
    onFiles,
}: ImageDropzoneProps) {
    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            disabled,
            noClick: true,
            multiple: true,

            accept: {
                "image/jpeg": [],
                "image/png": [],
                "image/webp": [],
            },

            onDrop: async (acceptedFiles) => {
                if (!acceptedFiles.length) return

                await onFiles(acceptedFiles)
            },
        })

    return (
        <div
            {...getRootProps()}
            className={cn(
                "relative rounded-xl transition-all",
                isDragActive &&
                "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
        >
            <input {...getInputProps()} />

            {children}

            {isDragActive && (
                <div
                    className={cn(
                        "absolute inset-0 z-50 flex flex-col items-center justify-center rounded-xl border-2 border-dashed backdrop-blur-sm transition-all",
                        isDragReject
                            ? "border-destructive bg-destructive/10"
                            : "border-primary bg-background/90"
                    )}
                >
                    <UploadCloud
                        className={cn(
                            "mb-3 size-12",
                            isDragReject ? "text-destructive" : "text-primary"
                        )}
                    />

                    <p className="font-medium">
                        {isDragReject ? "Unsupported file" : "Drop images here"}
                    </p>

                    <p className="text-sm text-muted-foreground">
                        {isDragReject
                            ? "Only JPG, PNG and WebP are allowed."
                            : "Release to upload"}
                    </p>
                </div>
            )}
        </div>
    )
}
