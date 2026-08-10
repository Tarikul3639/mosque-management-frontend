"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { MoreHorizontal, Pencil } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { TK } from "@/components/icons/tk"

import type { FamilyFeeHistory } from "@/types/monthly-fee"

interface FamilyFeeHistoryColumnsProps {
  onEdit?: (feeId: string) => void
}

export function familyFeeHistoryColumns({
  onEdit,
}: FamilyFeeHistoryColumnsProps): ColumnDef<FamilyFeeHistory>[] {
  return [
    {
      accessorKey: "monthlyFee",

      header: "Monthly Fee",

      cell: ({ row }) => (
        <span className="flex items-center font-medium">
          <TK className="mr-0.5 size-4" />

          {row.original.monthlyFee.toLocaleString()}
        </span>
      ),
    },

    {
      accessorKey: "startDate",

      header: "Start Date",

      cell: ({ row }) =>
        format(new Date(row.original.startDate), "dd MMM yyyy"),
    },

    {
      accessorKey: "endDate",

      header: "End Date",

      cell: ({ row }) =>
        row.original.endDate ? (
          format(new Date(row.original.endDate), "dd MMM yyyy")
        ) : (
          <Badge variant="secondary">Current</Badge>
        ),
    },

    {
      accessorKey: "createdAt",

      header: "Created",

      cell: ({ row }) =>
        format(new Date(row.original.createdAt), "dd MMM yyyy"),
    },

    {
      id: "actions",

      enableSorting: false,

      enableHiding: false,

      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="text-sm font-medium">Actions</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit?.(row.original.id)}>
              <Pencil className="mr-2 size-4" />
              Edit Fee
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
}
