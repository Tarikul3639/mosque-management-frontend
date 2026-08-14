"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { useMemo, useState } from "react"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Zoom from "yet-another-react-lightbox/plugins/zoom"

import "yet-another-react-lightbox/plugins/thumbnails.css"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import type { FileReference } from "@/types/common"

interface GalleryHeroProps {
  title?: string | null
  description?: string | null
  images: FileReference[]
}

export function GalleryHero({ title, description, images }: GalleryHeroProps) {
  const validImages = images.filter((image) => image.url?.trim())

  const [currentIndex, setCurrentIndex] = useState(0)

  const [open, setOpen] = useState(false)

  if (!validImages.length) {
    return null
  }

  const hasMultipleImages = validImages.length > 1

  const currentImage = validImages[currentIndex]

  const slides = useMemo(
    () =>
      validImages.map((image) => ({
        src: image.url,
      })),
    [validImages]
  )

  const previous = () => {
    setCurrentIndex((current) =>
      current === 0 ? validImages.length - 1 : current - 1
    )
  }

  const next = () => {
    setCurrentIndex((current) =>
      current === validImages.length - 1 ? 0 : current + 1
    )
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="relative aspect-16/8 bg-muted md:aspect-16/7">
          <Image
            src={currentImage.url}
            alt={title ?? "Gallery"}
            fill
            priority
            sizes="100vw"
            onClick={() => setOpen(true)}
            className="cursor-zoom-in object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

          <Button
            size="icon"
            variant="secondary"
            onClick={() => setOpen(true)}
            className="absolute top-5 right-5 rounded-full bg-background/80 backdrop-blur"
          >
            <Expand className="size-5" />
          </Button>

          {hasMultipleImages && (
            <>
              <button
                onClick={previous}
                className="absolute top-1/2 left-5 -translate-y-1/2 rounded-full"
              >
                <ChevronLeft className="size-6" />
              </button>

              <button
                onClick={next}
                className="absolute top-1/2 right-5 -translate-y-1/2 rounded-full"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <div className="absolute right-6 bottom-6 left-6 text-white">
            {title && (
              <h1 className="text-2xl font-bold md:text-4xl">{title}</h1>
            )}

            {description && (
              <p className="mt-3 line-clamp-2 max-w-3xl text-white/85">
                {description}
              </p>
            )}

            <div className="mt-4 inline-flex rounded-full bg-black/50 px-3 py-1 text-sm backdrop-blur">
              {currentIndex + 1} / {validImages.length}
            </div>
          </div>
        </div>

        {hasMultipleImages && (
          <div className="border-b bg-background">
            <div className="container mx-auto flex gap-3 overflow-x-auto px-4 py-4 md:px-6">
              {validImages.map((image, index) => (
                <button
                  key={image.id ?? image.url}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "relative aspect-video h-18 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    index === currentIndex
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    sizes="120px"
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
        slides={slides}
        index={currentIndex}
        plugins={[Zoom, Fullscreen, Thumbnails]}
        controller={{
          closeOnBackdropClick: true,
        }}
        carousel={{
          finite: false,
        }}
        on={{
          view: ({ index }) => setCurrentIndex(index),
        }}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
        }}
      />
    </>
  )
}
