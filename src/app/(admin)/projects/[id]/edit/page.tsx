import type { Metadata } from "next"

import { ProjectEditPage } from "@/features/projects/edit/ProjectEditPage"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export const metadata: Metadata = {
    title: "Edit Project",
    description: "Update development project information.",
}

export default async function Page({ params }: PageProps) {
    const { id } = await params

    return <ProjectEditPage id={id} />
}
