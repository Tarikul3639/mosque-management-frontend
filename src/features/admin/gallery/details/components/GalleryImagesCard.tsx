"use client"

import { ImageIcon } from "lucide-react"

import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/common/empty-state"
import type { FileReference } from "@/types/common"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface GalleryImagesCardProps {
  images: FileReference[]
}

export function GalleryImagesCard({ images }: GalleryImagesCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div className="space-y-1">
          <CardTitle>Gallery Images</CardTitle>

          <CardDescription>
            Browse all uploaded images in this gallery.
          </CardDescription>
        </div>

        <Badge variant="secondary">{images.length} Images</Badge>
      </CardHeader>

      <CardContent>
        {images.length === 0 ? (
          <EmptyState
            title="No Images"
            description="No images have been uploaded to this gallery yet."
            icon={<ImageIcon className="size-10 text-muted-foreground" />}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                className="group overflow-hidden rounded-xl border bg-muted"
              >
                <AspectRatio ratio={1 / 1} className="relative">
                  <img
                    src={image.url}
                    alt={`Gallery Image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />

                  <div className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-1 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
                    #{index + 1}
                  </div>
                </AspectRatio>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
