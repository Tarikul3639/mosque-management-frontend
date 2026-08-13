import { Error2 } from "@/components/common/error2"

import { getProjectDetails } from "@/services/api/projects.service"

import { ProjectGallery } from "./ProjectGallery"
import { ProjectInfoCard } from "./ProjectInfoCard"
import { ProjectProgressCard } from "./ProjectProgressCard"
import { ProjectTimeline } from "./ProjectTimeline"

interface ProjectContentProps {
  projectId: string
}

export async function ProjectContent({ projectId }: ProjectContentProps) {
  try {
    const project = await getProjectDetails(projectId)

    return (
      <section className="container mx-auto px-4 pb-16 md:px-6">
        <div className="space-y-6">
          {/* Hero Image */}
          {project.images.length > 0 && (
            <ProjectGallery images={project.images} title={project.title} />
          )}

          {/* Project Information */}
          <ProjectInfoCard project={project} />

          {/* Progress & Financial Information */}
          <ProjectProgressCard project={project} />

          {/* Timeline */}
          <ProjectTimeline
            startDate={project.startDate}
            endDate={project.endDate}
            status={project.status}
            createdAt={project.createdAt}
          />
        </div>
      </section>
    )
  } catch {
    return (
      <section className="container mx-auto px-4 pb-16 md:px-6">
        <Error2
          title="প্রকল্পের তথ্য লোড করা যায়নি"
          message="প্রকল্পের তথ্য আনতে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।"
        />
      </section>
    )
  }
}
