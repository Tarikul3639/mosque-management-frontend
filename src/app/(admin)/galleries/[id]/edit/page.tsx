// src/app/(admin)/galleries/[id]/edit/page.tsx

import { GalleryEditPage } from "@/features/gallery/edit/GalleryEditPage"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params

  return <GalleryEditPage id={id} />
}
