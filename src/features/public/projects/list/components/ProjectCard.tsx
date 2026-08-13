import Image from "next/image"
import Link from "next/link"

import { ArrowRight, CalendarDays, FolderKanban } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

import type { Project } from "@/types/project"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.images?.[0]?.url?.trim()

  return (
    <Card className="group overflow-hidden rounded-xl py-0 transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Project Image */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-primary/5">
            <FolderKanban className="size-12 text-primary/40" />
          </div>
        )}

        {/* Status */}
        <div className="absolute top-4 right-4">
          <ProjectStatusBadge status={project.status} />
        </div>
      </div>

      {/* Content */}
      <CardContent className="space-y-5 p-5">
        {/* Title & Description */}
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">
            {project.title}
          </h3>

          {project.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">অগ্রগতি</span>

            <span className="font-medium">{project.progress}%</span>
          </div>

          <Progress value={project.progress} />
        </div>

        {/* Budget & Spent */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4 text-sm">
          <div>
            <p className="text-muted-foreground">বাজেট</p>

            <p className="mt-1 font-semibold">
              ৳{project.budget.toLocaleString("bn-BD")}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">ব্যয়</p>

            <p className="mt-1 font-semibold">
              ৳{project.spent.toLocaleString("bn-BD")}
            </p>
          </div>
        </div>

        {/* Start Date */}
        {project.startDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-4" />

            <span>
              শুরু: {new Date(project.startDate).toLocaleDateString("bn-BD")}
            </span>
          </div>
        )}
      </CardContent>

      {/* Action */}
      <CardFooter className="border-t p-5">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/projects/${project.id}`}>
            বিস্তারিত দেখুন
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

/* -------------------------------------------------------------------------- */
/*                              Status Badge                                  */
/* -------------------------------------------------------------------------- */

interface ProjectStatusBadgeProps {
  status: Project["status"]
}

function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  switch (status) {
    case "PLANNING":
      return <Badge variant="secondary">পরিকল্পনাধীন</Badge>

    case "RUNNING":
      return <Badge className="bg-blue-600 hover:bg-blue-600">চলমান</Badge>

    case "COMPLETED":
      return (
        <Badge className="bg-emerald-600 hover:bg-emerald-600">সম্পন্ন</Badge>
      )

    case "CANCELLED":
      return <Badge variant="destructive">বাতিল</Badge>

    default:
      return <Badge variant="outline">{status}</Badge>
  }
}
