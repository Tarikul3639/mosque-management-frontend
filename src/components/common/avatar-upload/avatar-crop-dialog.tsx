"use client"

import { useCallback, useState } from "react"
import Cropper, { type Area, type Point } from "react-easy-crop"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface AvatarCropDialogProps {
    open: boolean
    image: string
    loading?: boolean
    shape?: "round" | "rect"
    onClose: () => void
    onSave: (croppedAreaPixels: Area, rotation: number) => Promise<void>
}

export function AvatarCropDialog({
    open,
    image,
    loading = false,
    shape = "round",
    onClose,
    onSave,
}: AvatarCropDialogProps) {
    const [crop, setCrop] = useState<Point>({
        x: 0,
        y: 0,
    })

    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

    const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
        setCroppedAreaPixels(croppedPixels)
    }, [])

    const [saving, setSaving] = useState(false)
    const isSaving = loading || saving

    const handleSave = async () => {
        if (!croppedAreaPixels) return

        try {
            setSaving(true)

            await onSave(croppedAreaPixels, rotation)

            onClose()
        } finally {
            setSaving(false)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value && !loading) {
                    onClose()
                }
            }}
        >
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Crop Avatar</DialogTitle>

                    <DialogDescription>
                        Adjust the image before uploading.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="relative h-80 overflow-hidden rounded-xl border bg-muted">
                        <Cropper
                            image={image}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1}
                            cropShape={shape}
                            showGrid={false}
                            objectFit="cover"
                            restrictPosition
                            minZoom={1}
                            maxZoom={3}
                            zoomSpeed={0.2}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                        />
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-2">
                            <Label>Zoom</Label>

                            <Slider
                                min={1}
                                max={3}
                                step={0.1}
                                value={[zoom]}
                                onValueChange={([value]) => setZoom(value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Rotation</Label>

                            <Slider
                                min={0}
                                max={360}
                                step={1}
                                value={[rotation]}
                                onValueChange={([value]) => setRotation(value)}
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSaving}>
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSave}
                        disabled={isSaving || !croppedAreaPixels}
                    >
                        {isSaving ? "Saving..." : "Apply"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
