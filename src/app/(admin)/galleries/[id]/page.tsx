// src/app/(dashboard)/galleries/[id]/page.tsx

import type { Metadata } from "next"

import { GalleryDetailsPage } from "@/features/gallery/details/GalleryDetailsPage"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { id } = await params

    return {
        title: "Gallery Details",
        description: `View gallery details (${id}).`,
    }
}

export default async function Page({ params }: PageProps) {
    const { id } = await params

    return <GalleryDetailsPage id={id} />
}
