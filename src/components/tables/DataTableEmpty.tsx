"use client"

import { TableCell, TableRow } from "@/components/ui/table"

interface DataTableEmptyProps {
  colSpan: number

  title?: string

  description?: string
}

export function DataTableEmpty({
  colSpan,
  title = "No data found",
  description = "There are no records to display.",
}: DataTableEmptyProps) {
  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={colSpan} className="h-72 text-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="rounded-full bg-muted p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.7}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2a4 4 0 014-4h7m0 0-3-3m3 3-3 3M4 5h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2z"
              />
            </svg>
          </div>

          <h3 className="text-base font-semibold">{title}</h3>

          <p className="max-w-sm text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </TableCell>
    </TableRow>
  )
}
