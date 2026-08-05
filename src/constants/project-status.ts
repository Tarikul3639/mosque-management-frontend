import {
    Clock3,
    LoaderCircle,
    CheckCircle2,
    XCircle,
} from "lucide-react"

export const PROJECT_STATUS = {
    PLANNING: "PLANNING",
    RUNNING: "RUNNING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
} as const

export type ProjectStatus = (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS]

export const PROJECT_STATUS_OPTIONS = [
    {
        label: "Planning",
        value: PROJECT_STATUS.PLANNING,
    },
    {
        label: "Running",
        value: PROJECT_STATUS.RUNNING,
    },
    {
        label: "Completed",
        value: PROJECT_STATUS.COMPLETED,
    },
    {
        label: "Cancelled",
        value: PROJECT_STATUS.CANCELLED,
    },
] as const

export const PROJECT_STATUS_CONFIG = {
    [PROJECT_STATUS.PLANNING]: {
        label: "Planning",
        icon: Clock3,
        className: "border-slate-200 bg-slate-100 text-slate-700",
    },
    [PROJECT_STATUS.RUNNING]: {
        label: "Running",
        icon: LoaderCircle,
        className: "border-blue-200 bg-blue-100 text-blue-700",
    },
    [PROJECT_STATUS.COMPLETED]: {
        label: "Completed",
        icon: CheckCircle2,
        className: "border-green-200 bg-green-100 text-green-700",
    },
    [PROJECT_STATUS.CANCELLED]: {
        label: "Cancelled",
        icon: XCircle,
        className: "border-red-200 bg-red-100 text-red-700",
    },
} as const

export function getProjectStatusLabel(status: ProjectStatus): string {
    return PROJECT_STATUS_CONFIG[status]?.label ?? status
}