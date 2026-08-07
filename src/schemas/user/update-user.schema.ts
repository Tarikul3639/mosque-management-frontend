import { z } from "zod"

import { USER_ROLES, USER_STATUSES } from "@/constants/user"
import { passwordSchema } from "./user-password.schema"

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email(),
    phone: z.e164(), // E.164 format, e.g., +15555555555

    // password optional, but if provided, must meet the password criteria
    password: passwordSchema.or(z.literal("")).optional(),
    repeatPassword: z.string().optional().or(z.literal("")),

    role: z.enum(USER_ROLES),
    status: z.enum(USER_STATUSES),
    avatarId: z.string().uuid().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const password = data.password?.trim()

    // If password is provided, ensure repeatPassword is also provided and matches
    if (!password) return

    if (!data.repeatPassword?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatPassword"],
        message: "Please confirm your password.",
      })
      return
    }

    if (password !== data.repeatPassword.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["repeatPassword"],
        message: "Passwords do not match.",
      })
    }
  })

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>
