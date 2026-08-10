"use client"

import { ROUTES } from "@/config/routes"
import { Images, Plus } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"
import { Button } from "@/components/ui/button"

import Link from "next/link"

export function GalleryHeader() {
  return (
    <PageHeader
      title="Gallery"
      description="Manage mosque gallery albums and uploaded images."
      icon={<Images className="size-6 text-primary" />}
      actions={
        <Button asChild>
          <Link href={ROUTES.ADMIN.GALLERY.CREATE}>
            <Plus className="size-4.5" />
            Create Gallery
          </Link>
        </Button>
      }
    />
  )
}
