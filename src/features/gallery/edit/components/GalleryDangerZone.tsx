"use client"

import { Loader2, Trash2 } from "lucide-react"

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
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

interface GalleryDangerZoneProps {
    isDeleting?: boolean
    onDelete: () => Promise<void>
}

export function GalleryDangerZone({
    isDeleting = false,
    onDelete,
}: GalleryDangerZoneProps) {
    return (
        <Card className="border-destructive/20">
            <CardHeader>
                <CardTitle className="text-destructive">
                    Danger Zone
                </CardTitle>

                <CardDescription>
                    Permanently delete this gallery and remove all associated
                    information. This action cannot be undone.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="w-full"
                        >
                            <Trash2 className="mr-2 size-4" />
                            Delete Gallery
                        </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Delete Gallery?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                                This action cannot be undone. The gallery will be
                                permanently removed.
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                                onClick={onDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting && (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                )}

                                Delete Gallery
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    )
}