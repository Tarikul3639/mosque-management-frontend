// src/app/(dashboard)/galleries/page.tsx

import type { Metadata } from "next"

import { GalleryPage } from "@/features/gallery/list/GalleryPage"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Manage mosque gallery albums and uploaded images.",
}

export default function Page() {
  return <GalleryPage />
}
