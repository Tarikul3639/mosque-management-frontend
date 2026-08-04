"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
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

import {
  useActivateCommitteeMemberMutation,
  useDeactivateCommitteeMemberMutation,
  useDeleteCommitteeMemberMutation,
} from "@/store/api/committee.api"

import { getErrorMessage } from "@/utils/get-error-message"

import type { CommitteeMember } from "@/types/committee"

interface CommitteeTableActionsProps {
  member: CommitteeMember
}

export function CommitteeTableActions({ member }: CommitteeTableActionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)

  const [activate] = useActivateCommitteeMemberMutation()
  const [deactivate] = useDeactivateCommitteeMemberMutation()
  const [remove, { isLoading: isDeleting }] = useDeleteCommitteeMemberMutation()

  async function handleDelete() {
    try {
      await remove(member.id).unwrap()
      toast.success("Committee member deleted.")
      setShowDeleteAlert(false)
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  async function handleToggleStatus() {
    try {
      if (member.isActive) {
        await deactivate(member.id).unwrap()
        toast.success("Member deactivated.")
      } else {
        await activate(member.id).unwrap()
        toast.success("Member activated.")
      }
    } catch (error) {
      toast.error(getErrorMessage(error))
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

        <DropdownMenuContent align="end" className="w-42">
          <DropdownMenuLabel className="text-sm">Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/committee/${member.id}`}>
              <Eye className="mr-2 size-4" />
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/committee/${member.id}/edit`}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={handleToggleStatus}>
            {member.isActive ? (
              <>
                <UserX className="mr-2 size-4" />
                Deactivate
              </>
            ) : (
              <>
                <UserCheck className="mr-2 size-4" />
                Activate
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={(e) => {
              e.preventDefault()
              setShowDeleteAlert(true)
            }}
          >
            <Trash2 className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Alert Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold text-foreground">
                {member.name}
              </span>{" "}
              from the committee.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
