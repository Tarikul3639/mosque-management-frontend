"use client"

import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"

import { Eye, Pencil, Trash2, MoreHorizontal } from "lucide-react"

import type { Donor } from "@/types/donor"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTableColumnHeader } from "@/components/common/data-table"
import {
    DropdownMenu,
    DropdownMenuLabel,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuItem,
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

import { getAvatarInitials, getAvatarColor } from "@/utils/avatar.utils"
import { formatDate } from "@/utils/format-date"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { getErrorMessage } from "@/utils/get-error-message"

import { useDeleteDonorMutation } from "@/store/api/donor.api"

export const donorColumns: ColumnDef<Donor>[] = [
    {
        accessorKey: "avatar",
        header: "",
        enableSorting: false,
        cell: ({ row }) => {
            const donor = row.original
            const color = getAvatarColor(donor.name)

            return (
                <Avatar className="h-10 w-10 border">
                    <AvatarImage src={donor.avatar?.url ?? undefined} alt={donor.name} />

                    <AvatarFallback
                        className={cn(color.bg, color.text, "text-sm font-medium")}
                    >
                        {getAvatarInitials(donor.name)}
                    </AvatarFallback>
                </Avatar>
            )
        },
    },
    {
        accessorKey: "name",
        meta: {
            title: "Name",
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
    },
    {
        accessorKey: "phone",
        meta: {
            title: "Phone",
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Phone" />
        ),
    },
    {
        accessorKey: "email",
        meta: {
            title: "Email",
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => row.original.email ?? "—",
    },
    {
        accessorKey: "isActive",
        meta: {
            title: "Status",
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) =>
            row.original.isActive ? (
                <Badge variant="success">Active</Badge>
            ) : (
                <Badge variant="destructive">Inactive</Badge>
            ),
    },
    {
        accessorKey: "address",
        meta: {
            title: "Address",
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => row.original.address ?? "—",
    },
    {
        accessorKey: "createdAt",
        meta: {
            title: "Created",
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Created" />
        ),
        cell: ({ row }) => formatDate(row.original.createdAt),
    },
    {
        accessorKey: "updatedAt",
        meta: {
            title: "Updated",
        },
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Updated" />
        ),
        cell: ({ row }) => formatDate(row.original.updatedAt),
    },
    {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
            const [isOpen, setIsOpen] = useState(false)
            const [deleteDonor, { isLoading }] = useDeleteDonorMutation()

            async function onSubmit() {
                try {
                    const response = await deleteDonor(row.original.id).unwrap()
                    toast.success(response.message)
                } catch (error) {
                    console.error("Failed to delete donor:", error)
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
                            <Link href={`/donors/${row.original.id}`}>
                                <Eye className="size-4" />
                                <span>View</span>
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem asChild>
                            <Link href={`/donors/${row.original.id}/edit`}>
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
                                    Are you sure you want to delete this donor?
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
