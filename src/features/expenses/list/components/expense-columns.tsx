// src/features/expenses/list/components/expense-columns.tsx

"use client"

import Link from "next/link"
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { type ColumnDef } from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

import { DataTableColumnHeader } from "@/components/common/data-table"

import { formatCurrency } from "@/utils/format-currency"
import { formatDate } from "@/utils/format-date"
import { formatExpenseCategory } from "@/utils/format-expense-category"

import type { Expense } from "@/types/expense"
import { useState } from "react"

import { useDeleteExpenseMutation } from "@/store/api/expense.api"

export const expenseColumns: ColumnDef<Expense>[] = [
    {
        accessorKey: "category",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),

        cell: ({ row }) => (
            <Badge variant="secondary">
                {formatExpenseCategory(row.original.category)}
            </Badge>
        ),
    },

    {
        accessorKey: "title",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),

        cell: ({ row }) => (
            <div className="max-w-62.5 truncate font-medium">
                {row.original.title}
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
        accessorKey: "expenseDate",

        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Expense Date" />
        ),

        cell: ({ row }) => formatDate(row.original.expenseDate),
    },

    {
        id: "createdBy",

        header: "Created By",

        cell: ({ row }) => <span>{row.original.createdBy?.name}</span>,
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

            const [deleteExpense, { isLoading }] = useDeleteExpenseMutation()

            const onSubmit = async () => {
                try {
                    await deleteExpense(row.original.id).unwrap()
                    setIsOpen(false)
                } catch (error) {
                    console.error("Failed to delete expense:", error)
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
                            <Link href={`/expenses/${row.original.id}`}>
                                <Eye className="size-4" />
                                <span>View</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href={`/expenses/${row.original.id}/edit`}>
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
                                    Are you sure you want to delete this expense?
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
