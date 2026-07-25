import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters.")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            ),

        confirmPassword: z.string().min(1, "Please confirm your password."),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    });

export type ResetPasswordSchema = z.infer<
    typeof resetPasswordSchema
>;