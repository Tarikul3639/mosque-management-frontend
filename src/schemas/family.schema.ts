import { z } from "zod";

export const familySchema = z.object({
    familyNo: z
        .string()
        .trim()
        .max(50, "Family number is too long.")
        .optional()
        .or(z.literal("")),
        
    headName: z
        .string()
        .trim()
        .min(1, "Head name is required.")
        .max(255, "Head name is too long."),

    phone: z
        .string()
        .trim()
        .min(1, "Phone number is required.")
        .max(20, "Phone number is too long."),

    address: z
        .string()
        .trim()
        .max(500, "Address is too long.")
        .optional()
        .or(z.literal("")),

    avatarId: z
        .string()
        .optional()
        .or(z.literal("")),

    isActive: z.boolean(),
});

export type FamilyFormValues = z.infer<typeof familySchema>;