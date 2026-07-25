export type StatusColor = "success" | "warning" | "danger" | "info" | "neutral"

export interface StatusColorClasses {
  text: string
  foreground: string
  bg: string
}

const STATUS_COLORS: Record<StatusColor, StatusColorClasses> = {
  success: {
    text: "text-success",
    foreground: "text-success-foreground",
    bg: "bg-success-bg",
  },

  warning: {
    text: "text-warning",
    foreground: "text-warning-foreground",
    bg: "bg-warning-bg",
  },

  danger: {
    text: "text-danger",
    foreground: "text-danger-foreground",
    bg: "bg-danger-bg",
  },

  info: {
    text: "text-info",
    foreground: "text-info-foreground",
    bg: "bg-info-bg",
  },

  neutral: {
    text: "text-muted-foreground",
    foreground: "text-muted-foreground",
    bg: "bg-muted",
  },
}

export function getStatusColor(status: StatusColor) {
  return STATUS_COLORS[status]
}
