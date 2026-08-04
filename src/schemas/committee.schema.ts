import { z } from "zod"

import { Designation } from "@/constants/designation"

export const committeeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name cannot exceed 100 characters."),

  designation: z.nativeEnum(Designation, {
    error: "Please select a designation.",
  }),

  phone: z
    .string()
    .trim()
    .max(20, "Phone number cannot exceed 20 characters.")
    .or(z.literal("")),

  email: z
    .email("Please enter a valid email address.")
    .max(255, "Email cannot exceed 255 characters.")
    .optional()
    .or(z.literal("")),

  avatarId: z.uuid("Invalid avatar.").optional().or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(500, "Address cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  joiningDate: z.string().min(1, "Joining date is required."),

  endDate: z.string().optional().or(z.literal("")).nullable(),

  isActive: z.boolean(),
})

export type CommitteeFormValues = z.infer<typeof committeeSchema>
