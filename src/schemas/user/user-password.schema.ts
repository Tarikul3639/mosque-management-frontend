import { z } from "zod"

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password must not exceed 100 characters.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/\d/, "Password must contain at least one number.")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character."
  )
