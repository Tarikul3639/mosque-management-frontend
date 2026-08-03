// src/features/expenses/edit/components/ExpenseDangerZone.tsx

"use client"

import { Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

interface ExpenseDangerZoneProps {
  isDeleting: boolean
  onDelete: () => void
}

export function ExpenseDangerZone({
  isDeleting,
  onDelete,
}: ExpenseDangerZoneProps) {
  return (
    <Card className="border-destructive/30">
      <CardHeader>
        <CardTitle className="text-destructive">Danger Zone</CardTitle>

        <CardDescription>
          Permanently delete this expense. This action cannot be undone.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Trash2 className="mr-2 size-4" />
              Delete Expense
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Expense?</AlertDialogTitle>

              <AlertDialogDescription>
                This will permanently remove this expense from the system. This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>

              <AlertDialogAction disabled={isDeleting} onClick={onDelete}>
                Delete Expense
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
