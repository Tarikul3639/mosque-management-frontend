import { z } from "zod"

import { PROJECT_STATUS, type ProjectStatus } from "@/constants/project-status"

export const projectSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(200, "Title is too long."),

    description: z.string().max(5000).optional().or(z.literal("")),

    budget: z
      .number({
        error: "Budget is required.",
      })
      .min(1, "Budget must be positive amount."),

    spent: z
      .number({
        error: "Spent amount is required.",
      })
      .min(0),

    progress: z
      .number({
        error: "Progress is required.",
      })
      .min(0)
      .max(100),

    status: z.enum(
      Object.values(PROJECT_STATUS) as [ProjectStatus, ...ProjectStatus[]]
    ),

    imageIds: z.array(z.string().uuid()),

    startDate: z.string().min(1, "Start date is required."),

    endDate: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.spent <= data.budget, {
    path: ["spent"],
    message: "Spent amount cannot exceed budget.",
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) {
        return true
      }

      return new Date(data.endDate) >= new Date(data.startDate)
    },
    {
      path: ["endDate"],
      message: "End date must be after start date.",
    }
  )

export type ProjectFormValues = z.infer<typeof projectSchema>
