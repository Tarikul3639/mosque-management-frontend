// src/schemas/donor.schema.ts

import { z } from "zod"

export const donorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  phone: z
    .string()
    .trim()
    .min(11, "Phone number is required.")
    .max(20, "Phone number is too long."),

  email: z.string().trim().email("Invalid email address.").or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(255, "Address cannot exceed 255 characters.")
    .or(z.literal("")),

  avatarId: z.string().optional().or(z.literal("")),

  isActive: z.boolean(),
})

export type DonorFormValues = z.infer<typeof donorSchema>