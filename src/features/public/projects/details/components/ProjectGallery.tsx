"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

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
    <section className="overflow-hidden rounded-xl border bg-muted">
      {/* Hero Image */}
      <div className="relative aspect-16/8 min-h-60 overflow-hidden sm:min-h-72 md:aspect-16/7 md:min-h-0">
        <Image
          key={currentImage.url}
          src={currentImage.url}
          alt={`${title} - ছবি ${currentIndex + 1}`}
          fill
          priority={currentIndex === 0}
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/10" />

        {hasMultipleImages && (
          <>
            {/* Counter */}
            <div className="absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              {currentIndex + 1} / {validImages.length}
            </div>

            {/* Previous */}
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              aria-label="আগের ছবি"
              className="absolute top-1/2 left-3 size-9 -translate-y-1/2 rounded-full bg-background/85 shadow-md backdrop-blur-sm hover:bg-background sm:left-5"
            >
              <ChevronLeft className="size-5" />
            </Button>

            {/* Next */}
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={goToNext}
              aria-label="পরের ছবি"
              className="absolute top-1/2 right-3 size-9 -translate-y-1/2 rounded-full bg-background/85 shadow-md backdrop-blur-sm hover:bg-background sm:right-5"
            >
              <ChevronRight className="size-5" />
            </Button>
          </>
        )}

        {/* Project title */}
        <div className="absolute right-4 bottom-4 left-4 sm:right-6 sm:bottom-6 sm:left-6">
          <h1 className="text-lg font-semibold text-white drop-shadow-sm sm:text-2xl">
            {title}
          </h1>

          {hasMultipleImages && (
            <p className="mt-1 text-xs text-white/80 sm:text-sm">
              ছবি {currentIndex + 1} দেখানো হচ্ছে
            </p>
          )}
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {hasMultipleImages && (
        <div className="border-t bg-background p-3 sm:p-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {validImages.map((image, index) => (
              <button
                key={image.id ?? `${image.url}-${index}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`ছবি ${index + 1} দেখুন`}
                aria-current={index === currentIndex}
                className={cn(
                  "relative size-14 shrink-0 overflow-hidden rounded-md border-2 transition-all sm:size-16",
                  index === currentIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={image.url}
                  alt={`${title} - ছবি ${index + 1}`}
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
  )
}
