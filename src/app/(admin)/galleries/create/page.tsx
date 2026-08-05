// src/app/(admin)/galleries/create/page.tsx

import { CreateGalleryPage } from "@/features/gallery/create/CreateGalleryPage"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create Gallery",
    description: "Create a new gallery by adding images, title, description, and display order.",
}

export default function Page() {
    return <CreateGalleryPage />
}