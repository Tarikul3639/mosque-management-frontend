export function formatBengaliDate(
  value: Date | string | null | undefined,
  locale = "bn-BD",
): string {
  if (!value) return ""
  
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value))
}