import { FolderSearch } from "lucide-react"

import { EmptyState } from "@/components/common/empty-state"
import { Error2 } from "@/components/common/error2"
import { Pagination } from "@/components/common/pagination"

import { getProjects } from "@/services/api/projects.service"
import type { ProjectQuery } from "@/types/project"

import { ProjectCard } from "./ProjectCard"
import { ProjectSectionHeader } from "./ProjectSectionHeader"

export async function ProjectsContent({
  page,
  limit,
  search,
  status,
}: ProjectQuery) {
  try {
    const projects = await getProjects({
      page,
      limit,
      search: search || undefined,
      status: status || undefined,
    })

    const hasProjects = projects.data.length > 0
    const hasFilter = Boolean(search || status)

    return (
      <section className="container mx-auto px-4 pb-16">
        <ProjectSectionHeader total={projects.meta.total} />

        {hasProjects ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {projects.data.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {projects.meta.totalPages > 1 && (
              <Pagination
                currentPage={projects.meta.page}
                totalPages={projects.meta.totalPages}
              />
            )}
          </>
        ) : (
          <EmptyState
            icon={<FolderSearch className="size-5" />}
            title={
              hasFilter ? "কোনো প্রকল্প পাওয়া যায়নি" : "কোনো প্রকল্প নেই"
            }
            description={
              hasFilter
                ? "আপনার নির্বাচিত ফিল্টারের সাথে মিল থাকা কোনো প্রকল্প পাওয়া যায়নি।"
                : "বর্তমানে কোনো উন্নয়ন প্রকল্প যোগ করা হয়নি।"
            }
          />
        )}
      </section>
    )
  } catch {
    return (
      <section className="container mx-auto px-4 pb-16">
        <Error2
          title="প্রকল্প লোড করা যায়নি"
          message="কিছুক্ষণ পরে আবার চেষ্টা করুন।"
        />
      </section>
    )
  }
}
