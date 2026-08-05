"use client"

import { useState } from "react"
import Link from "next/link"

import {
    Eye,
    Pencil,
    Trash2,
    MoreHorizontal,
    Loader2,
} from "lucide-react"

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
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import type { Gallery } from "@/types/gallery"
import { toast } from "sonner"
import { useDeleteGalleryMutation } from "@/store/api/gallery.api"
import { getErrorMessage } from "@/utils/get-error-message"

interface GalleryTableActionsProps {
    gallery: Gallery
}

export function GalleryTableActions({
    gallery,
}: GalleryTableActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deleteGallery, { isLoading }] = useDeleteGalleryMutation()

    const handleDelete = async () => {
        try {
            await deleteGallery(gallery.id).unwrap()
            toast.success("Gallery deleted successfully.")
            setShowDeleteDialog(false)
        } catch (error: any) {
            toast.error(getErrorMessage(error) || "Failed to delete gallery.")
        }
    }

    // Determine the gallery title for display in the confirmation dialog
    const galleryTitle = typeof gallery.title === "string" ? gallery.title : "this gallery"

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-8"
                    >
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="p-2 w-42">
                    <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link
                            href={`/galleries/${gallery.id}`}
                        >
                            <Eye className="mr-2 size-4" />
                            View
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link
                            href={`/galleries/${gallery.id}/edit`}
                        >
                            <Pencil className="mr-2 size-4" />
                            Edit
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={(e) => {
                            e.preventDefault()
                            setShowDeleteDialog(true)
                        }}
                    >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete &quot;{galleryTitle}&quot; and remove its data from the server.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                e.preventDefault()
                                handleDelete()
                            }}
                            disabled={isLoading}
                            variant="destructive"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-0.5 size-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}