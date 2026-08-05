"use client"

import { useState } from "react"
import { AlertTriangle, Loader2, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

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

interface ProjectDangerZoneProps {
    onDelete: () => void | Promise<void>
    isDeleting?: boolean
}

export function ProjectDangerZone({
    onDelete,
    isDeleting = false,
}: ProjectDangerZoneProps) {
    const [open, setOpen] = useState(false)

    return (
        <Card className="border-destructive/25">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="size-5" />
                    Danger Zone
                </CardTitle>

                <CardDescription>
                    These actions are irreversible. Please proceed carefully.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                <Alert variant="destructive">
                    <AlertTriangle className="size-4" />

                    <AlertTitle>Delete this project</AlertTitle>

                    <AlertDescription>
                        Permanently delete this project, including all associated
                        information. This action cannot be undone.
                    </AlertDescription>
                </Alert>

                <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <Trash2 className="mr-2 size-4" />
                            Delete Project
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the project
                                and remove all associated data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={async (e) => {
                                    e.preventDefault()
                                    await onDelete()
                                    setOpen(false)
                                }}
                                variant="destructive"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    "Yes, Delete Project"
                                )}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}