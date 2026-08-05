// src/app/(admin)/projects/create/page.tsx

import type { Metadata } from "next"

import { CreateProjectPage } from "@/features/projects/create/CreateProjectPage"

export const metadata: Metadata = {
    title: "Create Project",
    description:
        "Create a new mosque development project with budget, timeline, progress, and gallery.",
}

export default function Page() {
    return <CreateProjectPage />
}
