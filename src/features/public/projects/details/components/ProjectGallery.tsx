"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

import Lightbox from "yet-another-react-lightbox"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

import "yet-another-react-lightbox/styles.css"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

import type { FileReference } from "@/types/common"

interface ProjectGalleryProps {
  images: FileReference[]
  title: string
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const validImages = images.filter((image) => image.url?.trim())

  const [currentIndex, setCurrentIndex] = useState(0)
  const [open, setOpen] = useState(false)

  if (validImages.length === 0) {
    return null
  }

  const currentImage = validImages[currentIndex]

  const hasMultipleImages = validImages.length > 1

  const goToPrevious = () => {
    setCurrentIndex((current) =>
      current === 0 ? validImages.length - 1 : current - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((current) =>
      current === validImages.length - 1 ? 0 : current + 1
    )
  }

  return (
    <>
      <section className="overflow-hidden rounded-xl border bg-muted">
        {/* Hero */}
        <div className="relative aspect-16/8 min-h-60 overflow-hidden sm:min-h-72 md:aspect-16/7 md:min-h-0">
          <Image
            key={currentImage.url}
            src={currentImage.url}
            alt={`${title}-${currentIndex + 1}`}
            fill
            priority={currentIndex === 0}
            sizes="100vw"
            className="cursor-zoom-in object-cover"
            onClick={() => setOpen(true)}
          />

          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/10" />

          {hasMultipleImages && (
            <>
              <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1 text-sm text-white backdrop-blur">
                {currentIndex + 1} / {validImages.length}
              </div>

              <Button
                size="icon"
                variant="secondary"
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full"
              >
                <ChevronLeft />
              </Button>

              <Button
                size="icon"
                variant="secondary"
                onClick={goToNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full"
              >
                <ChevronRight />
              </Button>
            </>
          )}

          <div className="absolute right-6 bottom-6 left-6">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
          </div>
        </div>

        {/* Thumbnails */}
        {hasMultipleImages && (
          <div className="border-t bg-background p-4">
            <div className="flex gap-2 overflow-x-auto">
              {validImages.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition",
                    currentIndex === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={currentIndex}
        plugins={[Zoom]}
        slides={validImages.map((image) => ({
          src: image.url,
        }))}
        controller={{
          closeOnBackdropClick: true,
        }}
        on={{
          view: ({ index }) => setCurrentIndex(index),
        }}
      />
    </>
  )
}
