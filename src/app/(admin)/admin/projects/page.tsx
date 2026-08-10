// src/app/(admin)/project/page.tsx

import type { Metadata } from "next"
import { ProjectPage } from "@/features/admin/projects/list/ProjectPage"

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage mosque projects, budgets, progress, and project status.",
}

export default function Page() {
  return <ProjectPage />
}
