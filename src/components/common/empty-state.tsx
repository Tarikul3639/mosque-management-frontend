import { ReactNode } from "react"
import { FolderOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
    title?: string
    description?: string
    icon?: ReactNode
    action?: ReactNode
    className?: string
}

export function EmptyState({
    title = "No data found",
    description = "There are no records to display at the moment.",
    icon,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                "flex animate-in flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center fade-in-50",
                className
            )}
        >
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted/60 text-muted-foreground">
                {icon ?? <FolderOpen className="size-6" />}
            </div>

            <h3 className="text-base font-semibold tracking-tight">{title}</h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                {description}
            </p>

            {action && <div className="mt-4">{action}</div>}
        </div>
    )
}
