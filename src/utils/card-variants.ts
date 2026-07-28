import type { ClassValue } from "clsx"

export type MetricCardVariant =
    | "primary"
    | "success"
    | "warning"
    | "destructive"
    | "info"
    | "secondary"
    | "muted"

interface MetricCardVariantStyle {
    card: ClassValue
    icon: ClassValue
    value: ClassValue
}

export const metricCardVariants: Record<
    MetricCardVariant,
    MetricCardVariantStyle
> = {
    primary: {
        card: "border-primary/20 hover:border-primary/40",
        icon: "border-primary/20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground",
        value: "text-foreground",
    },

    success: {
        card: "border-success/20 hover:border-success/40",
        icon: "border-success/20 bg-gradient-to-br from-success to-success/80 text-success-foreground",
        value: "text-foreground",
    },

    warning: {
        card: "border-yellow-500/20 hover:border-yellow-500/40",
        icon: "border-yellow-500/20 bg-gradient-to-br from-yellow-500 to-amber-500 text-white",
        value: "text-foreground",
    },

    destructive: {
        card: "border-destructive/20 hover:border-destructive/40",
        icon: "border-destructive/20 bg-gradient-to-br from-destructive to-red-600 text-destructive-foreground",
        value: "text-destructive",
    },

    info: {
        card: "border-sky-500/20 hover:border-sky-500/40",
        icon: "border-sky-500/20 bg-gradient-to-br from-sky-500 to-cyan-500 text-white",
        value: "text-foreground",
    },

    secondary: {
        card: "border-secondary hover:border-secondary/80",
        icon: "border-secondary bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground",
        value: "text-foreground",
    },

    muted: {
        card: "border-border hover:border-border/80",
        icon: "border-border bg-gradient-to-br from-muted-foreground to-secondary-foreground text-white",
        value: "text-foreground",
    },
}
