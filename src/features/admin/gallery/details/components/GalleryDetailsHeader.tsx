"use client"

import { ROUTES } from "@/config/routes"
import { Images, Pencil } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/common/page-header"
import type { Gallery } from "@/types/gallery"

interface GalleryDetailsHeaderProps {
  gallery: Gallery
}

export function GalleryDetailsHeader({ gallery }: GalleryDetailsHeaderProps) {
  return (
    <PageHeader
      title={gallery.title}
      description={
        gallery.description ?? "Gallery details and uploaded images."
      }
      icon={<Images className="size-6 text-primary" />}
      backLinkHref={ROUTES.ADMIN.GALLERY.INDEX}
      backLinkTitle="Back to Galleries"
      actions={
        <Button asChild>
          <Link href={ROUTES.ADMIN.GALLERY.EDIT(gallery.id)}>
            <Pencil className="mr-2 size-4" />
            Edit Gallery
          </Link>
        </Button>
      }
    />
  )
}
