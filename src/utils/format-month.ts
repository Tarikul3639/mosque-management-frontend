// src/utils/format-month.ts

import { MONTHS } from "@/constants/date"

export function formatMonth(month: number, short = false) {
  const label = MONTHS[month - 1]?.label

  if (!label) return "-"

  return short ? label.slice(0, 3) : label
}
