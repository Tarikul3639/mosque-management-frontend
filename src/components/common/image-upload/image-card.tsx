"use client"

import { AlertCircle, Check, Loader2, Trash2, RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ImageProgress } from "./image-progress"
import type { UploadImage } from "./types"
import { cn } from "@/lib/utils"

interface ImageCardProps {
    image: UploadImage
    removable?: boolean
    onRemove?: (id: string) => void
    onRetry?: (id: string) => void
}

export function ImageCard({
    image,
    removable = true,
    onRemove,
    onRetry,
}: ImageCardProps) {
    const { id, url, uploading, completed, error, progress = 0 } = image

    return (
        <div className="group relative aspect-square overflow-hidden rounded-2xl bg-muted/50 border shadow-xs transition-all duration-300 hover:shadow-md">
            {/* Image */}
            <img
                src={url}
                alt=""
                className={cn(
                    "h-full w-full object-cover transition-transform duration-500 ease-out",
                    !uploading && "group-hover:scale-105",
                    uploading && "scale-105 blur-xs"
                )}
            />

            {/* Uploading State Overlay */}
            {uploading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-xs gap-2">
                    <ImageProgress
                        progress={progress}
                        size={80}
                        strokeWidth={4}
                        className="text-primary"
                    />
                    <span className="absolute text-xs font-bold tracking-tight text-foreground">
                        {progress}%
                    </span>
                </div>
            )}

            {/* Completed Badge (Top Left Corner) */}
            {completed && !uploading && (
                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm backdrop-blur-md">
                    <Check className="size-3 stroke-3" />
                    <span>Ready</span>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 bg-background/95 p-4 text-center backdrop-blur-xs">
                    <div className="rounded-full bg-destructive/10 p-3 text-destructive">
                        <AlertCircle className="size-6" />
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">Upload failed</p>
                    {onRetry && (
                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1.5 text-xs rounded-full px-3"
                            onClick={() => onRetry(id)}
                        >
                            <RotateCw className="size-3" />
                            Retry
                        </Button>
                    )}
                </div>
            )}

            {/* Bottom Action Bar (Appears on Hover) */}
            {removable && !uploading && (
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-background/80 p-2 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="text-[11px] font-medium text-muted-foreground truncate px-1">
                        Image
                    </span>

                    <Button
                        size="icon"
                        type="button"
                        variant="ghost"
                        className="size-7 rounded-lg text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => onRemove?.(id)}
                    >
                        <Trash2 className="size-3.5" />
                    </Button>
                </div>
            )}
        </div>
    )
}