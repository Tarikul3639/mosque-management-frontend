import Image from "next/image"
import Link from "next/link"

import { ArrowRight, Images } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

import type { Gallery } from "@/types/gallery"

interface GalleryCardProps {
  gallery: Gallery
}

export function GalleryCard({ gallery }: GalleryCardProps) {
  const coverImage = gallery.images.find((image) => image.url?.trim())?.url

  return (
    <Link
      href={`/galleries/${gallery.id}`}
      className="group block focus:outline-none"
    >
      <Card className="overflow-hidden rounded-xl py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Cover */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={gallery.title ?? "Gallery"}
              fill
              sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-primary/5">
              <Images className="size-12 text-primary/40" />
            </div>
          )}

          {/* Image Count */}
          <div className="absolute top-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
            {gallery.images.length} টি ছবি
          </div>
        </div>

        <CardContent className="space-y-3 p-4">
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold transition-colors group-hover:text-primary">
              {gallery.title ?? "গ্যালারি"}
            </h3>

            {gallery.description && (
              <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {gallery.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Images className="size-4" />

              <span>{gallery.images.length} টি ছবি</span>
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-primary">
              দেখুন
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
