import { format } from "date-fns"

export function formatDate(date: Date | string): string {
  return format(new Date(date), "dd MMM yyyy")
}

export function formatDateRange(
  from?: Date | string,
  to?: Date | string
): string {
  if (!from || !to) {
    return "All Time"
  }

  return `${formatDate(from)} - ${formatDate(to)}`
}
