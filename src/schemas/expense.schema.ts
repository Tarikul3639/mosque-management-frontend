import { z } from "zod";

import { ExpenseCategory } from "@/types/expense";

export const expenseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required.")
        .max(150),

    amount: z
        .number({
            message: "Amount is required.",
        })
        .positive("Amount must be greater than zero."),

    category: z.nativeEnum(ExpenseCategory),

    note: z
        .string()
        .optional()
        .or(z.literal("")),

    expenseDate: z.string(),
});

export type ExpenseFormValues = z.infer<
    typeof expenseSchema
>;