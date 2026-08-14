import { api } from "@/lib/axios"

import type { Gallery, GalleryQuery } from "@/types/gallery"
import type { PaginationMeta } from "@/types/common"

interface GalleryListResponse {
  data: Gallery[]
  meta: PaginationMeta
}

export async function getGalleries({
  page = 1,
  limit = 9,
  search = "",
}: GalleryQuery = {}): Promise<GalleryListResponse> {
  const { data } = await api.get<GalleryListResponse>("/galleries", {
    params: {
      page,
      limit,
      search: search || undefined,
    },
  })

  return data
}

export async function getGalleryDetails(galleryId: string): Promise<Gallery> {
  const { data } = await api.get<Gallery>(`/galleries/${galleryId}`)

  return data
}
