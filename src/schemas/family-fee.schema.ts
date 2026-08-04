import { z } from "zod"

export const familyFeeSchema = z.object({
    monthlyFee: z.number().min(0.01, "Monthly fee must be greater than 0."),
    startDate: z.string().min(1, "Start date is required."),
    endDate: z.string().nullable().optional(),
})

export type FamilyFeeFormValues = z.infer<typeof familyFeeSchema>
