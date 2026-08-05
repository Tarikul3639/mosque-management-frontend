import type { FileReference, PaginationMeta, UserReference } from "./common"

export interface Gallery {
  id: string
  title: string
  images: FileReference[]
  description: string | null
  order: number
  createdBy: UserReference | null
  updatedBy: UserReference | null
  createdAt: string
  updatedAt: string
}

export interface GallerySummary {
  totalImages: number
  lastUploadedAt: string | null
}

export interface GalleryListResponse {
  data: Gallery[]
  meta: PaginationMeta
}

export interface GalleryQuery {
  page?: number
  limit?: number
  search?: string
}

export interface CreateGalleryDto {
  title: string
  imageIds: string[]
  description?: string
  order?: number
}

export interface UpdateGalleryDto extends Partial<CreateGalleryDto> {}
