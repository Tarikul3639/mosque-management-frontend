import Link from "next/link"

import { FolderKanban, Home } from "lucide-react"

export function ProjectDetailsHeader() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="container mx-auto flex flex-wrap items-center gap-2 px-4 py-5 text-sm text-muted-foreground md:px-6"
    >
      <Link
        href="/"
        className="flex items-center gap-1.5 transition-colors hover:text-primary"
      >
        <Home className="size-4" />
        হোম
      </Link>

      <span aria-hidden="true">/</span>

      <Link
        href="/projects"
        className="flex items-center gap-1.5 transition-colors hover:text-primary"
      >
        <FolderKanban className="size-4" />
        উন্নয়ন প্রকল্পসমূহ
      </Link>

      <span aria-hidden="true">/</span>

      <span className="text-foreground">বিস্তারিত</span>
    </nav>
  )
}
