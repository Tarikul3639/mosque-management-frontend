"use client"

import { useGetProjectQuery } from "@/store/api/project.api"

import { ProjectDetailsSkeleton } from "./components/ProjectDetailsSkeleton"
import { ProjectDetailsHeader } from "./components/ProjectDetailsHeader"
import { ProjectGalleryCard } from "./components/ProjectGalleryCard"
import { ProjectOverviewCard } from "./components/ProjectOverviewCard"
import { ProjectTimelineCard } from "./components/ProjectTimelineCard"
import { ProjectInformationCard } from "./components/ProjectInformationCard"

interface ProjectDetailsPageProps {
    id: string
}

export function ProjectDetailsPage({ id }: ProjectDetailsPageProps) {
    const { data: project, isLoading } = useGetProjectQuery(id)

    if (isLoading || !project) {
        return <ProjectDetailsSkeleton />
    }

    return (
        <div className="space-y-6 p-6">
            <ProjectDetailsHeader project={project} />

            <div className="grid gap-6 xl:grid-cols-3">
                <div className="space-y-6 xl:col-span-2">
                    <ProjectOverviewCard project={project} />
                    <ProjectGalleryCard images={project.images} />
                </div>

                <div className="space-y-6">
                    <ProjectTimelineCard project={project} />

                    <ProjectInformationCard project={project} />
                </div>
            </div>
        </div>
    )
}
