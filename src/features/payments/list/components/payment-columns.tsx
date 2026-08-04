// src/features/payments/list/components/payment-columns.tsx

"use client"

import Link from "next/link"

import type { ColumnDef } from "@tanstack/react-table"

import { Eye, MoreHorizontal, Pencil, Receipt, Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

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

import { DataTableColumnHeader } from "@/components/common/data-table"

import {
  useDeletePaymentMutation,
  useLazyGetPaymentReceiptQuery,
} from "@/store/api/payment.api"

import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"
import { formatMonth } from "@/utils/format-month"
import { getErrorMessage } from "@/utils/get-error-message"

import { Payment, PaymentMethod } from "@/types/payment"
import { PaymentStatus } from "@/types/payment"

import { toast } from "sonner"
import { useState } from "react"

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

function MethodBadge({ method }: { method: PaymentMethod }) {
  return <Badge variant="outline">{method.replaceAll("_", " ")}</Badge>
}

export const paymentColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "familyNo",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Family" />
    ),

    cell: ({ row }) => (
      <div className="flex flex-col">
        <Link
          href={`/families/${row.original.familyId}`}
          className="font-medium"
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
    accessorKey: "createdBy",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.createdBy?.name || "N/A"}
      </span>
    ),
  },

  {
    accessorKey: "updatedBy",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated By" />
    ),

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.updatedBy?.name || "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "month",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Month" />
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
    accessorKey: "chargeAmount",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Charge" />
    ),

    cell: ({ row }) => formatCurrency(row.original.chargeAmount),
  },

  {
    accessorKey: "paymentAmount",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),

    cell: ({ row }) => (
      <div className="space-y-1">
        <p className="font-medium">
          {formatCurrency(row.original.paymentAmount)}
        </p>

        <StatusBadge status={row.original.status} />
      </div>
    ),
  },

  {
    accessorKey: "method",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Method" />
    ),

    cell: ({ row }) => <MethodBadge method={row.original.method} />,
  },

  {
    accessorKey: "paidAt",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid At" />
    ),

    cell: ({ row }) => formatDate(row.original.paidAt),
  },

  {
    id: "actions",

    enableSorting: false,
    enableHiding: false,

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),

    cell: ({ row }) => {
      const [open, setOpen] = useState(false)

      const [deletePayment, { isLoading }] = useDeletePaymentMutation()
      const [triggerGetReceipt, { isLoading: isReceiptLoading }] =
        useLazyGetPaymentReceiptQuery()

      const handleDelete = async () => {
        try {
          await deletePayment(row.original.id).unwrap()

          toast.success("Payment deleted successfully.")

          setOpen(false)
        } catch (error) {
          toast.error("Failed to delete payment.", {
            description: getErrorMessage(error),
          })
        }
      }

      const handlePrint = async () => {
        const printPromise = async () => {
          const blob = await triggerGetReceipt(row.original.id).unwrap()

          const url = window.URL.createObjectURL(blob)
          const iframe = document.createElement("iframe")
          iframe.style.display = "none"
          iframe.src = url
          document.body.appendChild(iframe)

          iframe.onload = () => {
            setTimeout(() => {
              iframe.contentWindow?.print()
            }, 100)
          }
        }

        toast.promise(printPromise(), {
          loading: "Preparing receipt for printing...",
          success: "Receipt ready to print!",
          error: "Failed to print receipt. Please try again.",
        })
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href={`/payments/${row.original.id}`}>
                  <Eye className="size-4" />
                  View
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/payments/${row.original.id}/edit`}>
                  <Pencil className="size-4" />
                  Edit
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <button
                  className="flex w-full items-center gap-2"
                  onClick={() => handlePrint()}
                  disabled={isReceiptLoading}
                >
                  <Receipt className="size-4" />
                  Receipt
                </button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setOpen(true)}
              >
                <Trash2 className="size-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Payment?</AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isLoading}
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
