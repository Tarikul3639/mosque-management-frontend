"use client"

import { useState } from "react"
import Link from "next/link"

import { Eye, Pencil, Trash2 } from "lucide-react"

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
import type { Project } from "@/types/project"
import { toast } from "sonner"

import { useDeleteProjectMutation } from "@/store/api/project.api"

interface ProjectTableActionsProps {
  project: Project
}

export function ProjectTableActions({ project }: ProjectTableActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteProject, { isLoading }] = useDeleteProjectMutation()

  const handleDeleteProject = async () => {
    try {
      await deleteProject(project.id).unwrap()
      toast.success("Project deleted successfully")
      setShowDeleteDialog(false)
    } catch (err) {
      console.error("Failed to delete the project:", err)
      toast.error("Failed to delete the project. Please try again.")
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="size-8">
            <span className="sr-only">Open Menu</span>⋮
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="p-1">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/projects/${project.id}`}>
              <Eye className="mr-2 size-4" />
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/projects/${project.id}/edit`}>
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
              This action cannot be undone. This will permanently delete the
              project &quot;{project.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                handleDeleteProject()
              }}
              disabled={isLoading}
              variant="destructive"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
