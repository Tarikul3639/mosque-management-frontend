// src/schemas/donation.schema.ts

import { z } from "zod"

import { PaymentMethod } from "@/types/payment"

export const donationSchema = z.object({
  donorId: z.string().uuid("Please select a donor."),

  amount: z
    .number({
      error: "Amount is required.",
    })
    .positive("Amount must be greater than 0."),

  purpose: z
    .string()
    .trim()
    .max(255, "Purpose cannot exceed 255 characters.")
    .optional()
    .or(z.literal("")),

  isAnonymous: z.boolean(),

  paymentMethod: z.nativeEnum(PaymentMethod, {
    error: "Please select a payment method.",
  }),

  transactionReference: z
    .string()
    .trim()
    .max(100, "Transaction reference cannot exceed 100 characters.")
    .optional()
    .or(z.literal("")),

  note: z
    .string()
    .trim()
    .max(1000, "Note cannot exceed 1000 characters.")
    .optional()
    .or(z.literal("")),

  donatedAt: z.string().datetime("Invalid donation date."),
})

export type DonationFormValues = z.infer<typeof donationSchema>
