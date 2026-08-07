import type { ReactNode } from "react"

export function highlightText(text: string, query: string): ReactNode {
  if (!query.trim()) return text

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const regex = new RegExp(`(${escapedQuery})`, "gi")
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        className="rounded bg-primary/15 px-0.5 font-semibold text-primary"
      >
        {part}
      </mark>
    ) : (
      part
    )
  )
}
