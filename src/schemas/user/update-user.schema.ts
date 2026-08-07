import { z } from "zod"

import { USER_ROLES, USER_STATUSES } from "@/constants/user"

import { passwordSchema } from "./user-password.schema"

export const updateUserSchema = z
  .object({
    name: z.string().trim().min(2).max(100),

    email: z.string().trim().email(),

    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s\-()]*$/)
      .min(5)
      .max(20),

    // password optional, but if provided, must meet the password criteria
    password: passwordSchema.or(z.literal("")).optional(),

    repeatPassword: z.string().optional().or(z.literal("")),

    role: z.enum(USER_ROLES),

    status: z.enum(USER_STATUSES),

    avatarId: z.string().uuid().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    const password = data.password?.trim()

    // password khali thakle - kono check lagbe na, user password change korchen na
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
