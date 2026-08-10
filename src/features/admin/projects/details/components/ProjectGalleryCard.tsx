"use client"

import { ImageIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { EmptyState } from "@/components/common/empty-state"
import type { FileReference } from "@/types/common"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface ProjectGalleryCardProps {
  images: FileReference[]
}

export function ProjectGalleryCard({ images }: ProjectGalleryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Gallery</CardTitle>
      </CardHeader>

      <CardContent>
        {images.length === 0 ? (
          <EmptyState
            icon={<ImageIcon className="size-6" />}
            title="No Images"
            description="There are no images available for this project."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {images.map((image) => (
              <div
                key={image.id}

                className="overflow-hidden rounded-lg border"
              >
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={image.url}
                    alt="Project"
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
