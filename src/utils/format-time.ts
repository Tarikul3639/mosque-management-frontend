export function formatTo12Hour(time: string | null): string {
    if (!time) {
        return "—"
    }

    const [hours, minutes] = time.split(":").map(Number)

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
        return time
    }

    const date = new Date()
    date.setHours(hours, minutes)

    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(date)
}