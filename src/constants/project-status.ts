export const PROJECT_STATUS = {
    PLANNING: "PLANNING",
    RUNNING: "RUNNING",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
} as const

export type ProjectStatus =
    (typeof PROJECT_STATUS)[keyof typeof PROJECT_STATUS]

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

export function getProjectStatusLabel(
    status: ProjectStatus
): string {
    return (
        PROJECT_STATUS_OPTIONS.find(
            (item) => item.value === status
        )?.label ?? status
    )
}