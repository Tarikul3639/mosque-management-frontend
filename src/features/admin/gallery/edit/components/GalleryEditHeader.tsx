"use client"

import { ROUTES } from "@/config/routes"
import { Images, Eye } from "lucide-react"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import type { Gallery } from "@/types/gallery"

interface GalleryEditHeaderProps {
  gallery: Gallery
}

export function GalleryEditHeader({ gallery }: GalleryEditHeaderProps) {
  return (
    <PageHeader
      title={`Edit ${gallery.title}`}
      description="Update gallery information, images, and display order."
      icon={<Images className="size-6 text-primary" />}
      backLinkHref={ROUTES.ADMIN.GALLERY.DETAIL(gallery.id)}
      backLinkTitle="Back to Gallery"
      actions={
        <Button asChild>
          <Link href={ROUTES.ADMIN.GALLERY.DETAIL(gallery.id)}>
            <Eye className="mr-2 size-4" />
            View Gallery
          </Link>
        </Button>
      }
    />
  )
}
