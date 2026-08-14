"use client"

import { useRouter } from "next/navigation"
import { ChevronRight, Home, Images } from "lucide-react"
import { ROUTES } from "@/config/routes"

export function GalleryDetailsHeader() {
  const router = useRouter()
  return (
    <section className="border-b bg-muted/30">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >
          <button
            type="button"
            onClick={() => router.push(ROUTES.PUBLIC.HOME)}
            className="flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Home className="size-4" />
            হোম
          </button>

          <ChevronRight className="size-4" />

          <button
            type="button"
            onClick={() => router.replace(ROUTES.PUBLIC.GALLERIES.INDEX)}
            className="flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <Images className="size-4" />
            গ্যালারি
          </button>

          <ChevronRight className="size-4" />

          <span className="font-medium text-foreground">বিস্তারিত</span>
        </nav>
      </div>
    </section>
  )
}
