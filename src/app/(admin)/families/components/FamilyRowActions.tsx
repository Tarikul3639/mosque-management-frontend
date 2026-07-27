"use client"

import { useState } from "react"
import Link from "next/link"

import { Eye, Loader2, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { toast } from "sonner"

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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useDeleteFamilyMutation, type Family } from "@/store/api/family.api"

interface FamilyRowActionsProps {
  family: Family
}

export function FamilyRowActions({ family }: FamilyRowActionsProps) {
  const [open, setOpen] = useState(false)

  const [deleteFamily, { isLoading }] = useDeleteFamilyMutation()

  async function handleDelete() {
    try {
      await deleteFamily(family.id).unwrap()

      toast.success("Family deleted successfully.")

      setOpen(false)
    } catch (error: unknown) {
      const message =
        (
          error as {
            data?: { message?: string }
          }
        )?.data?.message ?? "Failed to delete family."

      toast.error(message)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8 rounded-md">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-38 rounded-lg border-border p-2 shadow-lg transition-all duration-200 bg-background/50 backdrop-blur-xl">
          <DropdownMenuLabel className="px-2 py-1 text-sm font-medium text-muted-foreground">
            Actions
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/families/${family.id}`} className="cursor-pointer">
              <Eye className="mr-2 size-4" />
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href={`/families/${family.id}/edit`}
              className="cursor-pointer"
            >
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-destructive transition-colors duration-200 focus:bg-destructive/10 focus:text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Family</AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete <strong>{family.headName}</strong>
              ?
              <br />
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              disabled={isLoading}
              onClick={handleDelete}
              className="bg-destructive! text-destructive-foreground! transition-colors! duration-200! hover:bg-destructive/90!"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
