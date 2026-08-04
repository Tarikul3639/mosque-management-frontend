"use client"

import { useState } from "react"
import Link from "next/link"

import type { ColumnDef } from "@tanstack/react-table"

import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { toast } from "sonner"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTableColumnHeader } from "@/components/common/data-table"

import { useDeleteMonthlyChargeMutation } from "@/store/api/monthly-charge.api"

import type { MonthlyCharge } from "@/types/monthly-charge"
import { PaymentStatus } from "@/types/payment"

import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"
import { formatMonth } from "@/utils/format-month"
import { getErrorMessage } from "@/utils/get-error-message"

function StatusBadge({ status }: { status: PaymentStatus }) {
  switch (status) {
    case PaymentStatus.PAID:
      return <Badge className="bg-green-500 hover:bg-green-500">Paid</Badge>

    case PaymentStatus.PARTIAL:
      return (
        <Badge className="bg-yellow-500 hover:bg-yellow-500">Partial</Badge>
      )

    default:
      return <Badge variant="destructive">Due</Badge>
  }
}

export const monthlyChargeColumns: ColumnDef<MonthlyCharge>[] = [
  {
    accessorKey: "family",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Family" />
    ),

    cell: ({ row }) => (
      <div className="flex flex-col">
        <Link
          href={`/families/${row.original.familyId}`}
          className="font-medium text-foreground transition-colors hover:text-primary"
        >
          {row.original.familyNo}
        </Link>

        <span className="text-xs text-muted-foreground">
          {row.original.headName}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "period",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Period" />
    ),

    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{formatMonth(row.original.month)}</span>

        <span className="text-xs text-muted-foreground">
          {row.original.year}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "amount",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),

    cell: ({ row }) => (
      <span className="font-medium">{formatCurrency(row.original.amount)}</span>
    ),
  },

  {
    accessorKey: "payment",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),

    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium">{formatCurrency(row.original.paidAmount)}</p>

        <StatusBadge status={row.original.status} />
      </div>
    ),
  },

  {
    accessorKey: "dueDate",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),

    cell: ({ row }) => <span>{formatDate(row.original.dueDate)}</span>,
  },

  {
    accessorKey: "paidAt",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid At" />
    ),

    cell: ({ row }) =>
      row.original.paidAt ? formatDate(row.original.paidAt) : "—",
  },

  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),

    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false)

      const [deleteMonthlyCharge, { isLoading }] =
        useDeleteMonthlyChargeMutation()

      const onSubmit = async () => {
        try {
          await deleteMonthlyCharge(row.original.id).unwrap()

          setIsOpen(false)

          toast.success("Monthly charge deleted successfully.")
        } catch (error) {
          toast.error("Failed to delete monthly charge.", {
            description: getErrorMessage(error),
          })
        }
      }
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href={`/monthly-charges/${row.original.id}`}>
                  <Eye className="size-4" />
                  <span>View</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/monthly-charges/${row.original.id}/edit`}>
                  <Pencil className="size-4" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setIsOpen(true)}
              >
                <Trash2 className="size-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Monthly Charge?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone. This monthly charge will be
                  permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <Button
                  variant="destructive"
                  disabled={isLoading}
                  onClick={onSubmit}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )
    },
  },
]
