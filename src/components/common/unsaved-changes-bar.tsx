"use client"

import { Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type BarPosition = "top" | "bottom"

interface UnsavedChangesBarProps {
    isDirty: boolean
    isSubmitting?: boolean
    message?: string
    submitText?: string
    resetText?: string
    onSubmit: () => void
    onReset?: () => void
    position?: BarPosition
    className?: string
}

const positionStyles: Record<
    BarPosition,
    { wrapper: string; hiddenTranslate: string }
> = {
    top: {
        wrapper: "top-4",
        hiddenTranslate: "-translate-y-6",
    },
    bottom: {
        wrapper: "bottom-4",
        hiddenTranslate: "translate-y-6",
    },
}

export function UnsavedChangesBar({
    isDirty,
    isSubmitting = false,
    message = "You have unsaved changes",
    submitText = "Save changes",
    resetText = "Reset",
    onSubmit,
    onReset,
    position = "top",
    className,
}: UnsavedChangesBarProps) {
    const styles = positionStyles[position]

    return (
        <div
            className={cn(
                "fixed left-1/2 z-100 -translate-x-1/2 transition-all duration-300 ease-out",
                styles.wrapper,
                isDirty
                    ? "translate-y-0 opacity-100"
                    : cn("pointer-events-none opacity-0", styles.hiddenTranslate),
                className
            )}
        >
            <div className="flex items-center gap-3 rounded-full border bg-background/95 px-4 py-2 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/80">
                <span className="pl-1 text-sm text-muted-foreground">{message}</span>

                <div className="flex items-center gap-2">
                    {onReset && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 rounded-full px-3 hover:bg-destructive/10 hover:text-destructive"
                            onClick={onReset}
                            disabled={isSubmitting}
                        >
                            <X className="mr-1 size-3.5" />
                            {resetText}
                        </Button>
                    )}

                    <Button
                        type="button"
                        size="sm"
                        className="h-8 rounded-full px-4"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                        )}
                        {submitText}
                    </Button>
                </div>
            </div>
        </div>
    )
}
