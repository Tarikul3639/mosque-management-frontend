// src/schemas/gallery.schema.ts

import { z } from "zod"

export const gallerySchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(200, "Title cannot exceed 200 characters."),

    description: z
      .string()
      .max(5000, "Description cannot exceed 5000 characters.")
      .optional()
      .or(z.literal("")),

    order: z
      .number({
        error: "Display order is required.",
      })
      .int("Display order must be a whole number.")
      .min(1, "Display order must be at least 1."),

    imageIds: z.array(z.string().uuid()).optional(),
  })
  .refine((data) => data.imageIds && data.imageIds.length > 0, {
    path: ["imageIds"],
    message: "Please upload at least one image.",
  })

export type GalleryFormValues = z.infer<typeof gallerySchema>
