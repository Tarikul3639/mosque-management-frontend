import { format } from "date-fns"

export function formatDate(date: Date | string | null): string {
  if (!date) return "—"

  return format(new Date(date), "dd MMM yyyy")
}

export function formatDateRange(
  from?: Date | string | null,
  to?: Date | string | null
 ): string {
  if (!from || !to) {
    return "All Time"
  }

  return `${formatDate(from)} - ${formatDate(to)}`
}
