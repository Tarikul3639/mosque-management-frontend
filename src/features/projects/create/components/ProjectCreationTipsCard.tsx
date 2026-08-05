// src/features/projects/create/components/ProjectCreationTipsCard.tsx

"use client"

import {
  CircleDollarSign,
  FileImage,
  FolderKanban,
  Info,
  ListChecks,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProjectCreationTipsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Info className="size-5 text-primary" />
          Project Guidelines
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <FolderKanban className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-medium">Project Details</p>

              <p className="text-xs text-muted-foreground">
                Use a short, clear and meaningful project title. Add a
                description so everyone understands the purpose of the project.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CircleDollarSign className="mt-0.5 size-4 shrink-0 text-chart-2" />

            <div>
              <p className="text-sm font-medium">Budget Management</p>

              <p className="text-xs text-muted-foreground">
                Budget should always be greater than or equal to the spent
                amount. Update financial information regularly.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileImage className="mt-0.5 size-4 shrink-0 text-chart-3" />

            <div>
              <p className="text-sm font-medium">Gallery Images</p>

              <p className="text-xs text-muted-foreground">
                Upload high-quality images to document project progress and
                completed work.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/40 p-4">
          <div className="mb-3 flex items-center gap-2">
            <ListChecks className="size-4 text-primary" />

            <p className="text-sm font-semibold">Before Creating</p>
          </div>

          <ul className="space-y-2 text-xs text-muted-foreground">
            <li>• Verify the project title.</li>
            <li>• Check the allocated budget.</li>
            <li>• Select the correct project status.</li>
            <li>• Upload gallery images if available.</li>
            <li>• Review all information before submitting.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
