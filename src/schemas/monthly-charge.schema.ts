// src/schemas/monthly-charge.schema.ts

import { z } from "zod"

export const monthlyChargeSchema = z
    .object({
        amount: z
            .number({
                error: "Amount is required and must be a number.",
            })
            .min(0, "Amount must be at least 0."),

        paidAmount: z
            .number({
                error: "Paid amount is required and must be a number.",
            })
            .min(0, "Paid amount must be at least 0."),

        dueDate: z
            .string({
                error: "Due date is required.",
            })
            .min(1, "Due date is required."),

        paidAt: z.string().nullable().optional(),
    })
    .refine((data) => data.paidAmount <= data.amount, {
        path: ["paidAmount"],
        message: "Paid amount cannot be greater than amount.",
    })

export type MonthlyChargeFormValues = z.infer<typeof monthlyChargeSchema>
