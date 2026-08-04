// src/schemas/payment.schema.ts

import { z } from "zod"

import { PaymentMethod } from "@/types/payment"

export const paymentSchema = z.object({
  familyId: z
    .string({
      message: "Family is required.",
    })
    .min(1, "Please select a family."),

  monthlyChargeId: z
    .string({
      message: "Monthly charge is required.",
    })
    .min(1, "Please select a monthly charge."),

  amount: z
    .number({
      message: "Payment amount is required.",
    })
    .positive("Payment amount must be greater than 0."),

  method: z.nativeEnum(PaymentMethod, {
    message: "Payment method is required.",
  }),

  reference: z
    .string()
    .trim()
    .max(100, "Reference cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  note: z
    .string()
    .trim()
    .max(500, "Note cannot exceed 500 characters.")
    .optional()
    .or(z.literal("")),

  paidAt: z
    .string({
      message: "Payment date is required.",
    })
    .min(1, "Payment date is required."),
})

export type PaymentFormValues = z.infer<typeof paymentSchema>
