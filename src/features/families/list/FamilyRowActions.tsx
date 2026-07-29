"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Eye,
  Loader2,
  MoreHorizontal,
  Pencil,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useActivateFamilyMutation,
  useDeleteFamilyMutation,
} from "@/store/api/family.api";

import { Family } from "@/types/family";


interface FamilyRowActionsProps {
  family: Family;
}

export function FamilyRowActions({
  family,
}: FamilyRowActionsProps) {
  const [open, setOpen] = useState(false);

  const [
    deleteFamily,
    { isLoading: isDeleting },
  ] = useDeleteFamilyMutation();

  const [
    activateFamily,
    { isLoading: isActivating },
  ] = useActivateFamilyMutation();


  async function handleDelete() {
    try {
      const response = await deleteFamily(family.id).unwrap();
      toast.success(response.message);

      setOpen(false);
    } catch (error: unknown) {
      const message =
        (
          error as {
            data?: { message?: string };
          }
        )?.data?.message ?? "Failed to delete family.";

      toast.error(message);
    }
  }

  async function handleActivate() {
    try {
      const response = await activateFamily(family.id).unwrap();

      toast.success(response.message);
    } catch (error: unknown) {
      const message =
        (
          error as {
            data?: { message?: string };
          }
        )?.data?.message ?? "Failed to activate family.";

      toast.error(message);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-md"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-48 rounded-lg border p-2 shadow-lg backdrop-blur-md"
        >
          <DropdownMenuLabel className="px-2 py-1 text-sm font-medium text-muted-foreground">
            Actions
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link
              href={`/families/${family.id}`}
              className="cursor-pointer"
            >
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

          {family.isActive ? (
            <DropdownMenuItem
              onClick={() => setOpen(true)}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={handleActivate}
              disabled={isActivating}
              className="text-success hover:bg-success/10 focus:bg-success/10 focus:text-success disabled:opacity-50"
            >
              {isActivating ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <RotateCcw className="mr-2 size-4" />
              )}

              Activate
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={open}
        onOpenChange={setOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Family
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{family.headName}</strong>?

              <br />
              <br />

              The family will be marked as inactive and can
              be restored later.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>

            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? (
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
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}