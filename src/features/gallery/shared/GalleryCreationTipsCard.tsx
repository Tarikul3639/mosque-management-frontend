"use client"

import {
  FileImage,
  Images,
  ImagePlus,
  Info,
  ListChecks,
  ListOrdered,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function GalleryCreationTipsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Info className="size-5 text-primary" />
          Gallery Guidelines
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Images className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-medium">Gallery Details</p>

              <p className="text-xs text-muted-foreground">
                Use a clear and meaningful gallery title. Add a short
                description to help visitors understand the purpose of the
                gallery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ImagePlus className="mt-0.5 size-4 shrink-0 text-chart-2" />

            <div>
              <p className="text-sm font-medium">Image Quality</p>

              <p className="text-xs text-muted-foreground">
                Upload high-quality images with proper orientation. Avoid
                blurry, duplicated, or unrelated photos.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ListOrdered className="mt-0.5 size-4 shrink-0 text-chart-3" />

            <div>
              <p className="text-sm font-medium">Display Order</p>

              <p className="text-xs text-muted-foreground">
                Set the correct display order so galleries appear in the
                intended sequence on the website.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileImage className="mt-0.5 size-4 shrink-0 text-chart-4" />

            <div>
              <p className="text-sm font-medium">Gallery Images</p>

              <p className="text-xs text-muted-foreground">
                Ensure all uploaded images belong to the same event or activity
                for a consistent gallery.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="mb-3 flex items-center gap-2">
            <ListChecks className="size-4 text-primary" />

            <p className="text-sm font-semibold">Before Publishing</p>
          </div>

          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Verify the gallery title.</li>
            <li>• Add a meaningful description.</li>
            <li>• Upload all required images.</li>
            <li>• Set the correct display order.</li>
            <li>• Review the gallery before saving.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
