"use client"

import { useState } from "react"
import { UploadCloud } from "lucide-react"
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
    const [dragging, setDragging] = useState(false)

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault()
        if (disabled) return
        setDragging(true)
    }

    function handleDragLeave(e: React.DragEvent) {
        e.preventDefault()
        setDragging(false)
    }

    async function handleDrop(e: React.DragEvent) {
        e.preventDefault()
        setDragging(false)

        if (disabled) return

        const files = Array.from(e.dataTransfer.files).filter((file) =>
            file.type.startsWith("image/")
        )

        if (!files.length) return

        await onFiles(files)
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
                "relative rounded-xl transition-all",
                dragging &&
                "ring-2 ring-primary ring-offset-2 ring-offset-background"
            )}
        >
            {children}

            {dragging && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary bg-background/90 backdrop-blur-sm">
                    <UploadCloud className="mb-3 size-12 text-primary" />
                    <p className="font-medium">Drop images here</p>
                    <p className="text-sm text-muted-foreground">
                        Release to upload
                    </p>
                </div>
            )}
        </div>
    )
}