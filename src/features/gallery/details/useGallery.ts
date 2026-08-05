"use client"

import { useGetGalleryQuery } from "@/store/api/gallery.api"

interface UseGalleryProps {
    id: string
}

export function useGallery({
    id,
}: UseGalleryProps) {
    const {
        data: gallery,
        isLoading,
        isFetching,
        refetch,
    } = useGetGalleryQuery(id)

    return {
        gallery,

        isLoading,
        isFetching,

        refetch,
    }
}