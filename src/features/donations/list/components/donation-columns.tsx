// src/features/donations/list/components/donation-columns.tsx

"use client"

import Link from "next/link"
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { type ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { DataTableColumnHeader } from "@/components/common/data-table"

import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"

import type { Donation } from "@/types/donation"
import { useState } from "react"
import { getErrorMessage } from "@/utils/get-error-message"
import { toast } from "sonner"

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

import { useDeleteDonationMutation } from "@/store/api/donation.api"

export const donationColumns: ColumnDef<Donation>[] = [
  {
    accessorKey: "receiptNo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Receipt" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.original.receiptNo}</span>
    ),
  },

  {
    accessorKey: "donor.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Donor" />
    ),
    cell: ({ row }) => {
      const donor = row.original.donor

      return (
        <div className="space-y-1">
          <Link
            href={`/donors/${donor.id}`}
            className="font-medium hover:text-primary hover:underline"
          >
            {donor.name}
          </Link>
          <p className="text-xs text-muted-foreground">{donor.phone}</p>
        </div>
      )
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{formatCurrency(row.original.amount)}</div>
    ),
  },

  {
    accessorKey: "purpose",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purpose" />
    ),
    cell: ({ row }) => row.original.purpose ?? "—",
  },

  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline">{row.original.paymentMethod}</Badge>
    ),
  },

  {
    accessorKey: "isAnonymous",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Anonymous" />
    ),
    cell: ({ row }) => (
      <Badge variant={row.original.isAnonymous ? "secondary" : "outline"}>
        {row.original.isAnonymous ? "Yes" : "No"}
      </Badge>
    ),
  },

  {
    accessorKey: "donatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => formatDate(row.original.donatedAt),
  },

  {
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => row.original.createdBy?.name ?? "—",
  },

  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Actions" />
    },
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false)
      const [deleteDonation, { isLoading }] = useDeleteDonationMutation()

      async function onSubmit() {
        try {
          const response = await deleteDonation(row.original.id).unwrap()
          toast.success(response.message)
        } catch (error) {
          console.error("Failed to delete donation:", error)
          toast.error(getErrorMessage(error))
        } finally {
          setIsOpen(false)
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-42">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/donations/${row.original.id}`}>
                <Eye className="size-4" />
                <span>View</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`/donations/${row.original.id}/edit`}>
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

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this donation?
                </AlertDialogTitle>

                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>

                <Button
                  variant="destructive"
                  onClick={onSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenu>
      )
    },
  },
]
