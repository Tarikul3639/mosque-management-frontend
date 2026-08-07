import { z } from "zod"

import { USER_ROLES, USER_STATUSES } from "@/constants/user"
import { passwordSchema } from "./user-password.schema"

export const createUserSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email(),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s\-()]*$/)
      .min(5)
      .max(20),

    password: passwordSchema,
    repeatPassword: z.string(),

    role: z.enum(USER_ROLES),

    avatarId: z.string().uuid().nullable().optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords do not match.",
  })

export type CreateUserFormValues = z.infer<typeof createUserSchema>
