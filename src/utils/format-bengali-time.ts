export function formatBengaliTime(
  value: Date | string,
  locale = "bn-BD"
): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(value))
}
