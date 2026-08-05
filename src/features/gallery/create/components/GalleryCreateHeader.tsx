"use client"

import { Images } from "lucide-react"

import { PageHeader } from "@/components/common/page-header"

export function GalleryCreateHeader() {
    return (
        <PageHeader
            title="Create Gallery"
            description="Create a new gallery by adding images, title, description, and display order."
            icon={
                <Images className="size-6 text-primary" />
            }
            backLinkHref="/galleries"
            backLinkTitle="Back to Galleries"
        />
    )
}