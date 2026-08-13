import type { Metadata } from "next"

import { SITE_CONFIG } from "@/config/metadata"
import { ProjectDetailsPage } from "@/features/public/projects/details/ProjectDetailsPage"

interface ProjectDetailsPageProps {
  params: Promise<{
    projectId: string
  }>
}

export const metadata: Metadata = {
  title: "প্রকল্পের বিস্তারিত",
  description:
    "মসজিদের উন্নয়ন প্রকল্পের বিস্তারিত তথ্য, বাজেট, ব্যয়, অগ্রগতি, সময়সীমা এবং ছবি দেখুন।",
  keywords: [
    ...SITE_CONFIG.keywords,
    "Project Details",
    "Development Project Details",
    "Project Budget",
    "Project Progress",
    "Project Timeline",
    "Project Gallery",
    "উন্নয়ন প্রকল্পের বিস্তারিত",
    "প্রকল্পের বাজেট",
    "প্রকল্পের অগ্রগতি",
    "প্রকল্পের ছবি",
  ],
  alternates: {
    canonical: "/projects",
  },
}

export default async function Page({ params }: ProjectDetailsPageProps) {
  const { projectId } = await params

  return <ProjectDetailsPage projectId={projectId} />
}
